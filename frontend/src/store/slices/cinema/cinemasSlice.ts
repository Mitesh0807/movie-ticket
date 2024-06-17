import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCinemas, createCinema, updateCinema, deleteCinema } from './cinemaActions';
import { ICinema } from '../../../types';

interface CinemasState {
  cinemas: ICinema[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CinemasState = {
  cinemas: [],
  status: 'idle',
  error: null,
};

const cinemasSlice = createSlice({
  name: 'cinemas',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCinemas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCinemas.fulfilled, (state, action: PayloadAction<ICinema[]>) => {
        state.status = 'succeeded';
        state.cinemas = action.payload;
      })
      .addCase(fetchCinemas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch cinemas';
      })
      .addCase(createCinema.fulfilled, (state, action: PayloadAction<ICinema>) => {
        state.cinemas.push(action.payload);
      })
      .addCase(updateCinema.fulfilled, (state, action: PayloadAction<ICinema>) => {
        const index = state.cinemas.findIndex(cinema => cinema._id === action.payload._id);
        if (index !== -1) {
          state.cinemas[index] = action.payload;
        }
      })
      .addCase(deleteCinema.fulfilled, (state, action: PayloadAction<string>) => {
        state.cinemas = state.cinemas.filter(cinema => cinema._id !== action.payload);
      });
  },
});

export default cinemasSlice.reducer;
