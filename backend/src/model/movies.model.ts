import mongoose, { Document, Model, Schema } from 'mongoose';


export interface LeanMovie {
    id: string;
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
export interface IMovie extends Document {
  title: string;
  image?: string;
  language: string;
  trailer?: string;
  genres: mongoose.Types.ObjectId[]; 
  director: string;
  cast: string;
  description: string;
  duration: number;
  releaseDate: Date;
  endDate: Date;
  toLeanDocument: () => LeanMovie;
}

const movieSchema = new Schema<IMovie>({
  title: {
    type: String,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
  },
  trailer: {
    type: String,
  },
  language: {
    type: String,
    trim: true,
    lowercase: true,
  },
  genres: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Genre',
      required: true,
    },
  ],
  director: {
    type: String,
    trim: true,
    lowercase: true,
  },
  cast: {
    type: String,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    trim: true,
    lowercase: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});


  /**
   * Converts the movie document to a LeanMovie document by extracting the necessary properties.
   *
   * @return {Object} The LeanMovie document with id, title, image, language, genres, director, cast, description, duration, releaseDate, and endDate.
   */
movieSchema.methods.toLeanDocument = function () {
  const movie = this.toObject();
  return {
    id: movie._id.toString(),
    title: movie.title,
    image: movie.image,
    language: movie.language,
    genres: movie.genres,
    director: movie.director,
    cast: movie.cast,
    description: movie.description,
    duration: movie.duration,
    releaseDate: movie.releaseDate,
    endDate: movie.endDate,
  };
};

const Movie: Model<IMovie> = mongoose.model('Movie', movieSchema);

export default Movie;
