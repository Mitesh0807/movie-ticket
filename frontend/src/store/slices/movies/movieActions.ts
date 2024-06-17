import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMovie } from '../../../types';
import api from '@/utils/api';

export const fetchMovies = createAsyncThunk('movies/fetchAll', async () => {
  const response = await api.get('/movies');
  return response.data;
});

export const createMovie = createAsyncThunk('movies/create', async (movie: IMovie) => {
  const response = await api.post('/movies', movie);
  return response.data;
});

export const updateMovie = createAsyncThunk('movies/update', async (movie: IMovie) => {
  const response = await api.put(`${'movies'}/${movie._id}`, movie);
  return response.data;
});

export const deleteMovie = createAsyncThunk('movies/delete', async (id: string) => {
  await api.delete(`${'movies'}/${id}`);
  return id;
});
