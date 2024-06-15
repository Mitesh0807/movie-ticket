import { Router } from 'express';
import {
  createReservation,
  getAllReservations,
  getReservationById,
  checkinReservationById,
  updateReservationById,
  deleteReservationById,
} from '@/controller/reservation.controller';
import { requireSuperadmin,authenticateUser } from '@/middlewares/auth.middlewares';

const router = Router();

router.post('/reservations', authenticateUser, createReservation);
router.get('/reservations', authenticateUser, getAllReservations);
router.get('/reservations/:id', getReservationById);
router.get('/reservations/checkin/:id', checkinReservationById);
router.patch('/reservations/:id', requireSuperadmin, updateReservationById);
router.delete('/reservations/:id', requireSuperadmin, deleteReservationById);

export default router;
