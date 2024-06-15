import express from "express";
import userRouter from "@/routes/user.routes";
const router = express.Router();

router.use('/', userRouter);
export default router;