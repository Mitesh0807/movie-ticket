import express from "express";
import userRouter from "@/routes/user.routes";
import genreRouter from "@/routes/genre.routes";
import movieRouter from "@/routes/movies.route";
const router = express.Router();

router.use('/', userRouter);
router.use('/genres', genreRouter);
router.use('/movies', movieRouter);
export default router;