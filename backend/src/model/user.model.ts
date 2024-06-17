import mongoose, { Document, Schema, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Response } from 'express';

export interface IUserDocument extends Document {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: 'guest' | 'admin' | 'superadmin';
  phoneNumber?: string;
  imageUrl?: string;
  tokens: { token: string }[];
  createdAt: Date;
  updatedAt: Date;
  toLeanDocument(): LeanUserDocument;
  generateAuthToken(res: Response): Promise<string>;
}

interface LeanUserDocument {
  fullName: string;
  username: string;
  email: string;
  role: 'guest' | 'admin' | 'superadmin';
  phoneNumber?: string;
  imageUrl?: string;
  createdAt: Date;
}

interface IUserModel extends Model<IUserDocument> {
  findByCredentials(username: string, password: string): Promise<IUserDocument>;
}

const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: 'Email is invalid',
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 7,
      validate: {
        validator: (value: string) => !value.toLowerCase().includes('password'),
        message: 'Password should not contain the word "password"',
      },
    },
    role: {
      type: String,
      default: 'guest',
      enum: ['guest', 'admin', 'superadmin'],
    },
    phoneNumber: {
      type: String,
      unique: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isMobilePhone(value),
        message: 'Phone number is invalid',
      },
    },
    imageUrl: String,
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

/**
 * Converts the user document to a lean user document.
 *
 * @return {LeanUserDocument} The lean user document without sensitive data.
 */
userSchema.methods.toLeanDocument = function (this: IUserDocument): LeanUserDocument {
  const userObject = this.toObject();
  if (userObject.role !== 'superadmin') {
    delete userObject.updatedAt;
    delete userObject.__v;
  }
  delete userObject.password;
  delete userObject.tokens;
  return userObject as LeanUserDocument;
};


/**
 * Generates an authentication token for the user and sets it as a cookie.
 *
 * @param {express.Response} res - The response object.
 * @return {Promise<void>} Returns a promise that resolves when the token is set as a cookie.
 */
userSchema.methods.generateAuthToken = async function (this: IUserDocument, res: Response): Promise<void> {
  const token = jwt.sign({ _id: this._id.toString() }, 'mySecret', { expiresIn: 180000 });
  this.tokens = this.tokens.concat({ token });
  await this.save();

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 180000,
  });
};

/**
 * Finds a user by their credentials.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<IUserDocument>} The user document if credentials are valid.
 */
userSchema.statics.findByCredentials = async function (email: string, password: string): Promise<IUserDocument> {
  const user = await this.findOne({ email: email });
  if (!user) {
    throw new Error('Unable to login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

/**
 * Middleware function that hashes the user's password before saving.
 *
 * @param {IUserDocument} this - The user document being saved.
 * @param {function} next - The callback function to call after the middleware function completes.
 * @return {Promise<void>}
 */
userSchema.pre<IUserDocument>('save', async function (this: IUserDocument, next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export default User;
