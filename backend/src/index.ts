import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import logger from "./utils/logger";
import upload from "./utils/multer";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
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