import express from 'express';
import {
  createGenre,
  getGenres,
  getGenreById,
  updateGenreById,
  deleteGenreById,
} from '@/controller/genre.controller';
import { requireSuperadmin } from '@/middlewares/auth.middlewares';

const router = express.Router();

router.post('/',requireSuperadmin, createGenre);
router.get('/', getGenres);
router.get('/:id', getGenreById);
router.patch('/:id', requireSuperadmin,updateGenreById);
router.delete('/:id',requireSuperadmin, deleteGenreById);

export default router;
