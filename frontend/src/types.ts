export interface IMovie {
  _id?: string;
  title: string;
  image?: string;
  trailer?: string;
  language: string;
  genres: string[];
  director: string;
  cast: string;
  description: string;
  duration: number;
  releaseDate: Date;
  endDate: Date;
}

export interface ICinema {
  _id?: string;
  name: string;
  ticketPrice: number;
  city: string;
  seats: Array<unknown>;
  seatsAvailable: number;
  image?: string;
}

export interface IGenre {
  _id?: string;
  name: string;
  description?: string;
}

// types.ts
export interface IReservation {
  _id?: string;
  date: Date;
  startAt: string;
  seats: unknown[]; 
  ticketPrice: number;
  total: number;
  showtimeId: string;
  userId: string;
  phone: string;
  checkin?: boolean;
}

export interface IShowtime {
  _id?: string;
  startAt: string;
  startDate: Date;
  endDate: Date;
  movieId: string;
  cinemaId: string;
}

// types.ts
export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: IUser | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: IUser;
  token: string;
}
