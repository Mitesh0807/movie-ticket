// reservationsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchReservations, createReservation, updateReservation, deleteReservation } from './reservationActions';
import { IReservation } from '../../../types';

interface ReservationsState {
  reservations: IReservation[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReservationsState = {
  reservations: [],
  status: 'idle',
  error: null,
};

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReservations.fulfilled, (state, action: PayloadAction<IReservation[]>) => {
        state.status = 'succeeded';
        state.reservations = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch reservations';
      })
      .addCase(createReservation.fulfilled, (state, action: PayloadAction<IReservation>) => {
        state.reservations.push(action.payload);
      })
      .addCase(updateReservation.fulfilled, (state, action: PayloadAction<IReservation>) => {
        const index = state.reservations.findIndex(reservation => reservation._id === action.payload._id);
        if (index !== -1) {
          state.reservations[index] = action.payload;
        }
      })
      .addCase(deleteReservation.fulfilled, (state, action: PayloadAction<string>) => {
        state.reservations = state.reservations.filter(reservation => reservation._id !== action.payload);
      });
  },
});

export default reservationsSlice.reducer;
