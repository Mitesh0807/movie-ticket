import { LoginPayload } from '@/types';
import api from '@/utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginPayload) => {
    const response = await api.post(`${'users'}/login`, credentials);
    return response.data;
  }
);
export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.post(`${'users'}/logout`);
});
