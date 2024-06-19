import { z } from "zod";

export const ShowtimeSchema = z.object({
  startAt: z.string().min(1, "Start Time is required"),
  startDate: z.string({ required_error: "Start Date is required" }),
  endDate: z.string({ required_error: "End Date is required" }),
  movieId: z.string().optional(),
  cinemaId: z.string().optional(),
});
