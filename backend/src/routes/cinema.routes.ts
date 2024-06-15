import { Router } from 'express';
import {
  createCinema,
  getAllCinemas,
  getCinemaById,
  updateCinemaById,
  deleteCinemaById,
  uploadCinemaPhoto,
} from '@/controller/cinema.controller';
import {requireSuperadmin} from '@/middlewares/auth.middlewares';
import upload from '@/utils/multer';

const router = Router();

router.post('/', requireSuperadmin, createCinema);
router.post('/photo/:id', upload('cinemas').single('file'), uploadCinemaPhoto);
router.get('', getAllCinemas);
router.get('/:id', getCinemaById);
router.patch('/:id', requireSuperadmin, updateCinemaById);
router.delete('/:id', requireSuperadmin, deleteCinemaById);

export default router;
