import { createAsyncThunk } from "@reduxjs/toolkit";
import { IReservation } from "../../../types";
import api from "../../../utils/api";

export const fetchReservations = createAsyncThunk(
  "reservations/fetchAll",
  async () => {
    const response = await api.get("reservations");
    return response.data;
  }
);

export const createReservation = createAsyncThunk(
  "reservations/create",
  async (reservation: IReservation) => {
    const response = await api.post("reservations", reservation);
    return response.data;
  }
);

export const updateReservation = createAsyncThunk(
  "reservations/update",
  async (reservation: IReservation) => {
    const response = await api.put(
      `${"reservations"}/${reservation._id}`,
      reservation
    );
    return response.data;
  }
);

export const deleteReservation = createAsyncThunk(
  "reservations/delete",
  async (id: string) => {
    await api.delete(`${"reservations"}/${id}`);
    return id;
  }
);
