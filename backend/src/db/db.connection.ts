import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


import logger from "@/utils/logger";

/**
 * Connects to the MongoDB database using the provided Mongo URI.
 *
 * @return {Promise<typeof mongoose>} A promise that resolves to the connected mongoose instance.
 * @throws {Error} If the Mongo URI is not found in the environment variables.
 */
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Mongo URI not found");
    }
    const conn = await mongoose.connect(process.env.MONGO_URI, {});

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error: ${error.message}`);
    }
    process.exit(1);
  }
};

export default connectDB;