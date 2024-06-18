import { createAsyncThunk } from '@reduxjs/toolkit';
import { GenrePayload, IGenre } from '@/types';
import api from '@/utils/api';

export const fetchGenres = createAsyncThunk('genres/fetchAll', async () => {
  const response = await api.get('/genres');
  return response.data;
});

export const createGenre = createAsyncThunk('genres/create', async (genre: GenrePayload) => {
  const response = await api.post('/genres', genre);
  return response.data;
});

export const updateGenre = createAsyncThunk('genres/update', async (genre: IGenre) => {
  const response = await api.put(`${'/genres'}/${genre._id}`, genre);
  return response.data;
});

export const deleteGenre = createAsyncThunk('/genres/delete', async (id: string) => {
  await api.delete(`${'/genres'}/${id}`);
  return id;
});
