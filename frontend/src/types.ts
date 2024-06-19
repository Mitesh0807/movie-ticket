import { z } from "zod";
import { MovieSchema } from "@/schema/MovieSchema";
import { GenreSchema } from "@/schema/GenreSchema";
import { CinemaSchema } from "@/schema/CinemaSchema";
import { ShowtimeSchema } from "@/schema/ShowtimeSchema";

export type MoviePayload = z.infer<typeof MovieSchema>;
export type GenrePayload = z.infer<typeof GenreSchema>;
export type CinemaPayload = z.infer<typeof CinemaSchema>;
export type ShowtimePayload = z.infer<typeof ShowtimeSchema>;
export interface IMovie {
  _id?: string;
  title: string;
  image?: string;
  trailer?: string;
  language: string;
  genres: IGenre[];
  director: string;
  cast: string;
  description: string;
  duration: number;
  releaseDate: Date;
  endDate: Date;
}

export interface ICinema {
  _id?: string;
  name: string;
  ticketPrice: number;
  city: string;
  seats: Array<unknown>;
  seatsAvailable: number;
  image?: string;
}

export interface IGenre {
  _id: string;
  name: string;
  description?: string;
}

export interface IReservation {
  _id?: string;
  date: Date;
  startAt: string;
  seats: unknown[];
  ticketPrice: number;
  total: number;
  showtimeId: IShowtime;
  userId: string;
  phone: string;
  checkin?: boolean;
}

export interface IShowtime {
  _id?: string;
  startAt: string;
  startDate: Date;
  endDate: Date;
  movieId: IMovie;
  cinemaId: ICinema;
  seats: Array<Array<number>>;
  seatsAvailable: number;
}

export interface IUser {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
  phoneNumber: string;
  tokens: Array<{ token: string; _id: string }>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthState {
  user: IUser | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isAdmin: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: IUser;
  token: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}
