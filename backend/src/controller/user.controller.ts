import type { Request, Response } from 'express';
import User from '@/model/user.model';
import logger from '@/utils/logger';
import asyncHandler from 'express-async-handler';
import upload from '@/utils/multer';


/**
 * Creates a new user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the user is created and a response is sent.
 * @throws {Error} If the request body contains a 'role' property.
 */
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { role, ...userData } = req.body;

  if (role) {
    logger.error('You cannot set the role property.');
    throw new Error('You cannot set the role property.');
  }
  const user = new User(userData);
  await user.save();
  const token = await user.generateAuthToken(res);
  const leanUser = user.toLeanDocument();
  res.status(201).send({ leanUser, token });
});


/**
 * Uploads a user photo.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the photo is uploaded and a response is sent.
 * @throws {Error} If no file is attached to the request.
 */
export const uploadUserPhoto =
  (upload('photo'),
  asyncHandler(async (req: Request, res: Response) => {
    const url = `${req.protocol}://${req.get('host')}`;
    const { file } = req;
    const userId = req.params.id;

    if (!file) {
      res.sendStatus(400);
      return;
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        res.sendStatus(404);
        return;
      }
      user.imageUrl = `${url}/${file.path}`;
      await user.save();
      res.send({ user, file });
    } catch (e) {
      logger.error(`Error uploading photo: ${e}`);
      res.sendStatus(400);
    }
  }));


/**
 * Logs in a user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the user is logged in and a response is sent.
 * @throws {Error} If the user credentials are invalid.
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findByCredentials(req.body?.email, req.body.password);
  if (!user) {
    res.status(401).send({ error: 'Invalid email or password' });
    return;
  }
  const token = await user.generateAuthToken(res);
  const leanUser = user.toLeanDocument();
  res.send({ user: leanUser, token });
});

/**
 * Logs out a user from a specific session.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the user is logged out and a response is sent.
 * @throws {Error} If the request user is not found.
 */
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }
    req.user.tokens = req?.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * Logs out all sessions for the current user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when all sessions are logged out and a response is sent.
 * @throws {Error} If the request user is not found.
 */
export const logoutAllSessions = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * Gets all users. Only superadmins can access this resource.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when all users are retrieved and sent in the response.
 * @throws {Error} If the request user is not found or is not a superadmin.
 */
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  if (req.user.role !== 'superadmin') {
    res.status(403).send({ error: 'Only superadmins can access this resource.' });
    return;
  }

  const users = await User.find({});
  res.send(users);
});


/**
 * Retrieves the current user from the request and sends a response with the user object.
 *
 * @async
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const leanUser = req.user?.toLeanDocument();
    res.send({ user: leanUser });
});

/**
 * Gets a user by ID. Only superadmins can access this resource.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the user is retrieved and sent in the response.
 * @throws {Error} If the request user is not found, is not a superadmin, or the user with the specified ID is not found.
 */
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  if (req.user.role !== 'superadmin') {
    res.status(403).send({ error: 'Only superadmins can access this resource.' });
    return;
  }

  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  res.send(user);
});

/**
 * Updates the current user with the given request body.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the user is updated and sent in the response.
 * @throws {Error} If the request user is not found, the updates are invalid, or the user cannot be saved.
 */
export const updateUser = asyncHandler(
  asyncHandler(async (req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['fullName', 'phoneNumber', 'username', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      res.status(400).send({ error: 'Invalid updates!' });
      return;
    }

    try {
      if (!req.user) {
        res.sendStatus(401);
        return;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      updates.forEach((update) => (req.user[update] = req.body[update]));
      await req.user.save();
      const leanUser = req.user.toLeanDocument();
      res.send({ user: leanUser });
    } catch (e) {
      res.status(400).send(e);
    }
  }),
);

/**
 * Updates a user by their ID with the given request body.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the user is updated and sent in the response.
 * @throws {Error} If the request user is not found, the updates are invalid, or the user cannot be saved.
 */
export const updateUserById = asyncHandler(async (req: Request, res: Response) => {
  if (req?.user?.role !== 'superadmin') {
    res.status(403).send({ error: 'Only superadmins can update this resource.' });
    return;
  }

  const userId = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['fullName', 'phoneNumber', 'username', 'email', 'password', 'role'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
    return;
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.sendStatus(404);
      return;
    }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * Deletes a user by their ID. Only superadmins can access this resource.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the user is deleted and a response is sent.
 * @throws {Error} If the request user is not found, is not a superadmin, or the user with the specified ID is not found.
 */
export const deleteUserById = asyncHandler(async (req: Request, res: Response) => {
  if (req?.user?.role !== 'superadmin') {
    res.status(403).send({ error: 'Only superadmins can delete this resource.' });
    return;
  }

  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.send({ message: 'User deleted' });
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * Deletes a user account.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the user account is deleted and a response is sent.
 * @throws {Error} If the request user is not found.
 */
export const deleteUserAccount = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

