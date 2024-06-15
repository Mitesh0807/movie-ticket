import express from 'express';
import upload from '@/utils/multer';
import {
  createMovie,
  uploadMovieImage,
  getAllMovies,
  getMovieById,
  getMovieByGenreId,
  updateMovieById,
  deleteMovieById,
} from '@/controller/movies.controller';
import { requireSuperadmin } from '@/middlewares/auth.middlewares';

const router = express.Router();

router.post('/', requireSuperadmin, createMovie);
router.post('/photo/:id', requireSuperadmin, upload('movies').single('file'), uploadMovieImage);
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.get('/genre/:genre', getMovieByGenreId);
router.put('/:id', requireSuperadmin, upload('photo').single('file'), updateMovieById);
router.delete('/:id', requireSuperadmin, deleteMovieById);

export default router;
