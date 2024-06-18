import mongoose, { Document, Schema } from 'mongoose';

export interface IReservation extends Document {
  date: Date;
  startAt: string;
  seats: any[];
  ticketPrice: number;
  total: number;
  showtimeId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  phone: string;
  checkin: boolean;
}

const reservationSchema: Schema = new Schema({
  date: {
    type: Date,
    default: Date.now,
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
  seatsSelected: {
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
  showtimeId: {
    type: Schema.Types.ObjectId,
    ref: 'Showtime',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  phone: {
    type: String,
  },
  checkin: {
    type: Boolean,
    default: false,
  },
});

const Reservation = mongoose.model<IReservation>('Reservation', reservationSchema);

export default Reservation;
