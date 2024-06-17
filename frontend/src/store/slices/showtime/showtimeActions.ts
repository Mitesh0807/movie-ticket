import { createAsyncThunk } from '@reduxjs/toolkit';
import { IShowtime } from '../../../types';
import api from '../../../utils/api';


export const fetchShowtimes = createAsyncThunk('showtimes/fetchAll', async () => {
  const response = await api.get('');
  return response.data;
});

export const createShowtime = createAsyncThunk('showtimes/create', async (showtime: IShowtime) => {
  const response = await api.post('', showtime);
  return response.data;
});

export const updateShowtime = createAsyncThunk('showtimes/update', async (showtime: IShowtime) => {
  const response = await api.put(`${''}/${showtime._id}`, showtime);
  return response.data;
});

export const deleteShowtime = createAsyncThunk('showtimes/delete', async (id: string) => {
  await api.delete(`${''}/${id}`);
  return id;
});
