import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '@/model/user.model';
import logger from '@/utils/logger';

/**
 * Middleware function to authenticate a user based on a token in the request header.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to call in the middleware chain.
 * @return {Promise<void>} - A promise that resolves when the authentication is successful, or rejects with an error if authentication fails.
 */
const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req['cookies']['token'];
    if (!token) {
      throw new Error('Authentication failed');
    }
    const decoded = jwt.verify(token, 'mySecret') as { _id: string };
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    if (!user) {
      throw new Error('Authentication failed');
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

/**
 * TODO: switch to cookies after testing
 * Middleware function to check if the user is a superadmin.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to call in the middleware chain.
 * @return {Promise<void>} - A promise that resolves when the user is a superadmin, or rejects with an error if authentication fails.
 */
const requireSuperadmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req['cookies']['token'];
    if (!token) {
      logger.info('token not found', 'error');
      throw new Error('Authentication failed');
    }
    const decoded = jwt.verify(token, 'mySecret') as { _id: string };
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    if (!user || user.role !== 'superadmin') {
      throw new Error('Authentication failed');
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    logger.error(JSON.stringify(e) + 'error');
    res.status(401).send({ error: 'Please authenticate as a superadmin.' });
  }
};

export { authenticateUser, requireSuperadmin };
