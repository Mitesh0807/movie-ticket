// genresSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGenres, createGenre, updateGenre, deleteGenre } from './genreActions';
import { IGenre } from '../../../types';

interface GenresState {
  genres: IGenre[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GenresState = {
  genres: [],
  status: 'idle',
  error: null,
};

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGenres.fulfilled, (state, action: PayloadAction<IGenre[]>) => {
        state.status = 'succeeded';
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch genres';
      })
      .addCase(createGenre.fulfilled, (state, action: PayloadAction<IGenre>) => {
        state.genres.push(action.payload);
      })
      .addCase(updateGenre.fulfilled, (state, action: PayloadAction<IGenre>) => {
        const index = state.genres.findIndex(genre => genre._id === action.payload._id);
        if (index !== -1) {
          state.genres[index] = action.payload;
        }
      })
      .addCase(deleteGenre.fulfilled, (state, action: PayloadAction<string>) => {
        state.genres = state.genres.filter(genre => genre._id !== action.payload);
      });
  },
});

export default genresSlice.reducer;
