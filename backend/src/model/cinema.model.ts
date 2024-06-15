import mongoose, { Document, Schema } from 'mongoose';


export interface LeanCinema {
    _id: string;
    name: string;
    ticketPrice: number;
    city: string;
    seats: any[];
    seatsAvailable: number;
    image?: string;
}
export interface ICinema extends Document {
  name: string;
  ticketPrice: number;
  city: string;
  seats: any[];
  seatsAvailable: number;
  image?: string;
  toLeanDocument: () => LeanCinema;
}

const cinemaSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

cinemaSchema.methods.toLeanDocument = function () {
  const movie = this.toObject();
  return {
    _id: movie._id,
    name: movie.name,
    ticketPrice: movie.ticketPrice,
    city: movie.city,
    seats: movie.seats,
    seatsAvailable: movie.seatsAvailable,
    image: movie.image,
  };
};




const Cinema = mongoose.model<ICinema>('Cinema', cinemaSchema);

export default Cinema;
