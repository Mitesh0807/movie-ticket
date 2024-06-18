import { createAsyncThunk } from "@reduxjs/toolkit";
import { CinemaPayload, ICinema } from "../../../types";
import api from "../../../utils/api";

export const fetchCinemas = createAsyncThunk("cinemas/fetchAll", async () => {
  const response = await api.get("");
  return response.data;
});

export const createCinema = createAsyncThunk(
  "cinemas/create",
  async (cinema: CinemaPayload) => {
    const response = await api.post("", cinema);
    return response.data;
  }
);

export const updateCinema = createAsyncThunk(
  "cinemas/update",
  async (cinema: ICinema) => {
    const response = await api.put(`${""}/${cinema._id}`, cinema);
    return response.data;
  }
);

export const deleteCinema = createAsyncThunk(
  "cinemas/delete",
  async (id: string) => {
    await api.delete(`${""}/${id}`);
    return id;
  }
);
