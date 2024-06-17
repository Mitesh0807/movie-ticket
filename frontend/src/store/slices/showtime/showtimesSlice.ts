// showtimesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchShowtimes, createShowtime, updateShowtime, deleteShowtime } from './showtimeActions';
import { IShowtime } from '../../../types';

interface ShowtimesState {
  showtimes: IShowtime[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ShowtimesState = {
  showtimes: [],
  status: 'idle',
  error: null,
};

const showtimesSlice = createSlice({
  name: 'showtimes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchShowtimes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShowtimes.fulfilled, (state, action: PayloadAction<IShowtime[]>) => {
        state.status = 'succeeded';
        state.showtimes = action.payload;
      })
      .addCase(fetchShowtimes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch showtimes';
      })
      .addCase(createShowtime.fulfilled, (state, action: PayloadAction<IShowtime>) => {
        state.showtimes.push(action.payload);
      })
      .addCase(updateShowtime.fulfilled, (state, action: PayloadAction<IShowtime>) => {
        const index = state.showtimes.findIndex(showtime => showtime._id === action.payload._id);
        if (index !== -1) {
          state.showtimes[index] = action.payload;
        }
      })
      .addCase(deleteShowtime.fulfilled, (state, action: PayloadAction<string>) => {
        state.showtimes = state.showtimes.filter(showtime => showtime._id !== action.payload);
      });
  },
});

export default showtimesSlice.reducer;
