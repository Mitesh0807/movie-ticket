import { z } from "zod";

export const MovieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.string().optional(),
  trailer: z.string().optional(),
  language: z.string().min(1, "Language is required"),
  genres: z.array(z.string()).optional(),
  director: z.string().min(1, "Director is required"),
  cast: z.string().min(1, "Cast is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().min(1, "Duration must be at least 1 minute"),
  releaseDate: z.string(),
  endDate: z.string(),
});
