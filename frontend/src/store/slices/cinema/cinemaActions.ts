import { createAsyncThunk } from "@reduxjs/toolkit";
import { CinemaPayload, ICinema } from "../../../types";
import api from "../../../utils/api";

export const fetchCinemas = createAsyncThunk("cinemas/fetchAll", async () => {
  const response = await api.get("/cinemas");
  return response.data;
});

export const createCinema = createAsyncThunk(
  "cinemas/create",
  async (cinema: CinemaPayload) => {
    const response = await api.post("/cinemas", cinema);
    return response.data;
  }
);

export const updateCinema = createAsyncThunk(
  "cinemas/update",
  async (cinema: ICinema) => {
    const response = await api.put(`${"/cinemas"}/${cinema._id}`, cinema);
    return response.data;
  }
);

export const deleteCinema = createAsyncThunk(
  "cinemas/delete",
  async (id: string) => {
    await api.delete(`${"/cinemas"}/${id}`);
    return id;
  }
);
