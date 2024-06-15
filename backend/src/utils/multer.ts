import multer, { StorageEngine, FileFilterCallback } from 'multer';
import { Request } from 'express';
import path from 'path';
import logger from '@/utils/logger';

/**
 * Creates a multer storage engine for disk storage with the specified upload path.
 *
 * @param {string} uploadPath - The path to store uploaded files.
 * @return {StorageEngine} - The multer storage engine for disk storage.
 */
const storage = (uploadPath: string): StorageEngine =>
  multer.diskStorage({
    destination: path.join(__dirname, '../../uploads', uploadPath),
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

/**
 * Creates a multer upload instance with the specified upload path and file filter.
 *
 * @param {string} uploadPath - The path to store uploaded files.
 * @return {multer.Multer} - The multer upload instance.
 */
const upload = (uploadPath: string) =>
  multer({
    storage: storage(uploadPath),
    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        logger.error('Only .png, .jpg and .jpeg format allowed!');
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    },
  });

export default upload;
