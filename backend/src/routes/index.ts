import express from "express";
import userRouter from "@/routes/user.routes";
import genreRouter from "@/routes/genre.routes";
import movieRouter from "@/routes/movies.routes";
import cinemaRouter from '@/routes/cinema.routes';
import showTimeRouter from '@/routes/showtime.routes';
import reserVationRouter from '@/routes/reservation.routes';
const router = express.Router();

router.use('/', userRouter);
router.use('/genres', genreRouter);
router.use('/movies', movieRouter);
router.use('/cinemas',cinemaRouter);
router.use('/showtimes',showTimeRouter);
router.use('/reservations',reserVationRouter);
export default router;