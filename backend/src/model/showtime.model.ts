import mongoose, { Document, Schema } from 'mongoose';

export interface IShowtime extends Document {
  startAt: string;
  startDate: Date;
  endDate: Date;
  movieId: mongoose.Types.ObjectId;
  cinemaId: mongoose.Types.ObjectId;
  seats: Array<Array<number>>;
  seatsAvailable: number;
}

const showtimeSchema: Schema = new Schema({
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  cinemaId: {
    type: Schema.Types.ObjectId,
    ref: 'Cinema',
    required: true,
  },
  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
});

const Showtime = mongoose.model<IShowtime>('Showtime', showtimeSchema);

export default Showtime;
