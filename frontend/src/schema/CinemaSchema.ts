import { z } from "zod";

export const CinemaSchema = z.object({
  name: z.string().min(1, "Name is required"),
  ticketPrice: z.string().min(1, "Ticket Price must be at least 1"),
  city: z.string().min(1, "City is required"),
  seatsPerRow: z.string().min(1, "Seats Per Row must be at least 1"),
  seatsPerColumn: z.string().min(1, "Seats Per Column must be at least 1"),
  image: z.string().optional(),
});
