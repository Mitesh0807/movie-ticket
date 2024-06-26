import { LoginPayload, SignupPayload } from "@/types";
import api from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginPayload) => {
    const response = await api.post(`${"users"}/login`, credentials);
    return response.data;
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  await axios.post(`${"users"}/logout`);
});

export const me = createAsyncThunk("auth/me", async () => {
  const response = await api.get(`${"users"}/me`);
  return response.data;
});

export const admin = createAsyncThunk("auth/isAdmin", async () => {
  const response = await api.get(`${"users"}/isAdmin`);
  return response.data;
});

export const signUp = createAsyncThunk(
  "auth/signup",
  async (credentials: SignupPayload) => {
    const response = await api.post(`${"users"}/`, credentials);
    return response.data;
  }
);
