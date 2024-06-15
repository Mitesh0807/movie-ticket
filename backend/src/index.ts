import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import logger from "./utils/logger";
import upload from "./utils/multer";
import cors from "cors";

import connectDB from "./db/db.connection";



dotenv.config();
(async () => await connectDB())();


const app: Express = express();
const port = process.env.PORT || 3000;


//TODO: proper cors setup required
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/healthcheck", (req: Request, res: Response) => {
  res.send("OK");
});

app.post('/upload', upload('images').single('file'), (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded or invalid file format');
    }
    res.send(`File uploaded successfully: ${req.file.filename}`);
  });

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`);
});