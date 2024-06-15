import multer, { StorageEngine, FileFilterCallback } from 'multer';
import { Request } from 'express';
import path from 'path';

const storage = (uploadPath: string): StorageEngine =>
  multer.diskStorage({
    destination: path.join(__dirname, './uploads', uploadPath),
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

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
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    },
  });

export default upload;
