import { Router } from 'express';
import {
  createReservation,
  getAllReservations,
  getReservationById,
  checkinReservationById,
  updateReservationById,
  deleteReservationById,
  cancelReservationById,
} from '@/controller/reservation.controller';
import { requireSuperadmin, authenticateUser } from '@/middlewares/auth.middlewares';

const router = Router();

router.post('/', authenticateUser, createReservation);
router.get('/', authenticateUser, getAllReservations);
router.get('/:id', getReservationById);
router.get('/checkin/:id', checkinReservationById);
router.get('/cancel/:id', authenticateUser, cancelReservationById);
router.patch('/:id', requireSuperadmin, updateReservationById);
router.delete('/:id', requireSuperadmin, deleteReservationById);

export default router;
