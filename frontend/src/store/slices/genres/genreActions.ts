import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IGenre } from '../../../types';

export const fetchGenres = createAsyncThunk('genres/fetchAll', async () => {
  const response = await axios.get('');
  return response.data;
});

export const createGenre = createAsyncThunk('genres/create', async (genre: IGenre) => {
  const response = await axios.post('', genre);
  return response.data;
});

export const updateGenre = createAsyncThunk('genres/update', async (genre: IGenre) => {
  const response = await axios.put(`${''}/${genre._id}`, genre);
  return response.data;
});

export const deleteGenre = createAsyncThunk('genres/delete', async (id: string) => {
  await axios.delete(`${''}/${id}`);
  return id;
});
