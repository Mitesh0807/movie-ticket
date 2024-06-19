import { createAsyncThunk } from "@reduxjs/toolkit";
import { IShowtime, ShowtimePayload } from "../../../types";
import api from "../../../utils/api";

export const fetchShowtimes = createAsyncThunk(
  "showtimes/fetchAll",
  async () => {
    const response = await api.get("showtimes");
    return response.data;
  }
);

export const createShowtime = createAsyncThunk(
  "showtimes/create",
  async (showtime: ShowtimePayload) => {
    const response = await api.post("/showtimes", showtime);
    return response.data;
  }
);

export const updateShowtime = createAsyncThunk(
  "showtimes/update",
  async (showtime: IShowtime) => {
    const response = await api.put(`${"/showtimes"}/${showtime._id}`, showtime);
    return response.data;
  }
);

export const deleteShowtime = createAsyncThunk(
  "showtimes/delete",
  async (id: string) => {
    await api.delete(`${"/showtimes"}/${id}`);
    return id;
  }
);

export const fetchShowtimeById = createAsyncThunk(
  "showtimes/fetchById",
  async (id: string) => {
    const response = await api.get(`/showtimes/${id}`);
    return response.data;
  }
);

export const fetchShowtimesByCinemaId = createAsyncThunk(
  "showtimes/fetchByCinemaId",
  async (cinemaId: string) => {
    const response = await api.get(`/showtimes/cinema/${cinemaId}`);
    return response.data;
  }
);
