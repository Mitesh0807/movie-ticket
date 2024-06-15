import mongoose, { Document, Schema } from 'mongoose';

export interface IReservation extends Document {
  date: Date;
  startAt: string;
  seats: any[];
  ticketPrice: number;
  total: number;
  movieId: mongoose.Types.ObjectId;
  cinemaId: mongoose.Types.ObjectId;
  username: string;
  phone: string;
  checkin: boolean;
}

const reservationSchema: Schema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
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
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  checkin: {
    type: Boolean,
    default: false,
  },
});

const Reservation = mongoose.model<IReservation>('Reservation', reservationSchema);

export default Reservation;
