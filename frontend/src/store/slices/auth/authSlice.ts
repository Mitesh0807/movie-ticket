// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, me } from "./authActions";
import { AuthState, IUser } from "@/types";

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: IUser; token: string }>) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to login";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.token = null;
      })
      .addCase(me.pending, (state) => {
        state.status = "loading";
      })
      .addCase(me.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.status = "idle";
      })
      .addCase(me.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to varify user please login again";
      });
  },
});

export default authSlice.reducer;
