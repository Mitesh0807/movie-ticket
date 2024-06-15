import mongoose, { Document, Schema } from 'mongoose';

export interface GenreDocument extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  toLeanDocument: () => LeanGenre;
}

export interface LeanGenre {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const genreSchema = new Schema<GenreDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


/**
 * Converts the genre document to a LeanGenre document.
 *
 * @return {Object} The LeanGenre document with id, name, description, createdAt, and updatedAt.
 */
genreSchema.methods.toLeanDocument = function () {
    const genre = this.toObject();
    return {
      id: genre._id.toString(),
      name: genre.name,
      description: genre.description,
      createdAt: genre.createdAt,
      updatedAt: genre.updatedAt,
    };
  };


export const Genre = mongoose.model<GenreDocument>('Genre', genreSchema);

