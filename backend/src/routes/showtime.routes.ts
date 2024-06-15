import { Router } from 'express';
import {
  createShowtime,
  getAllShowtimes,
  getShowtimeById,
  updateShowtimeById,
  deleteShowtimeById,
} from '@/controller/showtime.controller';
import { requireSuperadmin } from '@/middlewares/auth.middlewares';
const router = Router();

router.post('/', requireSuperadmin, createShowtime);
router.get('/', getAllShowtimes);
router.get('/:id', getShowtimeById);
router.patch('/:id', requireSuperadmin, updateShowtimeById);
router.delete('/:id', requireSuperadmin, deleteShowtimeById);

export default router;
