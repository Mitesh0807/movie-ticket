import { configureStore } from "@reduxjs/toolkit";
import cinemasSlice from "./slices/cinema/cinemasSlice";
import moviesSlice from "./slices/movies/moviesSlice";
import genresSlice from "./slices/genres/genresSlice";
import reservationsSlice from "./slices/reservation/reservationsSlice";
import showtimesSlice from "./slices/showtime/showtimesSlice";
import authSlice from "./slices/auth/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cinemas: cinemasSlice,
    movies: moviesSlice,
    genres: genresSlice,
    reservations: reservationsSlice,
    showtime: showtimesSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
