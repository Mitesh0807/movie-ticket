// moviesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMovies, createMovie, updateMovie, deleteMovie } from './movieActions';
import { IMovie } from '../../../types';

interface MoviesState {
  movies: IMovie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  status: 'idle',
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      })
      .addCase(createMovie.fulfilled, (state, action: PayloadAction<IMovie>) => {
        state.movies.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action: PayloadAction<IMovie>) => {
        const index = state.movies.findIndex(movie => movie._id === action.payload._id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      .addCase(deleteMovie.fulfilled, (state, action: PayloadAction<string>) => {
        state.movies = state.movies.filter(movie => movie._id !== action.payload);
      });
  },
});

export default moviesSlice.reducer;
