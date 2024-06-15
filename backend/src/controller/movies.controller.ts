import { Request, Response, NextFunction } from 'express';
import Movie, { IMovie, LeanMovie } from '@/model/movies.model';
import asyncHandler from 'express-async-handler';
import { Model } from 'mongoose';
import upload from '@/utils/multer';
import { Genre } from '@/model/genre.model';

/**
 * Creates a new movie.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the movie is created and sent in the response, or rejects with an error if there was a problem saving the movie.
 */
export const createMovie = asyncHandler(async (req: Request, res: Response) => {
  const movie = new Movie(req.body);
  try {
    await movie.save();
    res.status(201).send(movie);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * Uploads an image for a movie.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<void>} A promise that resolves when the image is uploaded and the response is sent, or rejects with an error if there was a problem uploading the image.
 */
export const uploadMovieImage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const url = `${req.protocol}://${req.get('host')}`;
  const { file } = req;
  const movieId = req.params.id;
  try {
    if (!file) {
      res.status(400).send('No file uploaded');
      return;
    }
    const movie = await Movie.findById(movieId);
    if (!movie) {
      res.sendStatus(404);
      return;
    }
    movie.image = `${url}/${file.path}`;
    await movie.save();
    res.send({ movie, file });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

/**
 * Retrieves all movies.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the movies are retrieved and sent in the response, or rejects with an error if there was a problem retrieving the movies.
 */
export const getAllMovies = asyncHandler(async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find({}).populate('genres');
    res.send(movies);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * Retrieves a movie by its ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the movie is retrieved and sent in the response, or rejects with an error if there was a problem retrieving the movie.
 */
export const getMovieById = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const movie = await Movie.findById(_id).populate('genres');
    if (!movie) {
      res.sendStatus(404);
      return;
    }
    res.send(movie);
  } catch (e) {
    res.status(400).send(e);
  }
});


/**
 * Retrieves movies by a genre ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the movies are retrieved and sent in the response, or rejects with an error if there was a problem retrieving the movies.
 */
export const getMovieByGenreId = asyncHandler(async (req: Request, res: Response) => {
  const genre = req.params.genre;
  try {
    const movies = await Movie.find({ genres: { $in: [genre] } }).populate('genres');
    res.send(movies);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * Updates a movie by its ID with the given request body.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the movie is updated and sent in the response, or rejects with an error if there was a problem updating the movie.
 * @throws {Error} If the updates are invalid, or the movie with the specified ID is not found.
 */
export const updateMovieById = (upload('photo'),asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'title',
    'image',
    'language',
    'genres',
    'director',
    'cast',
    'description',
    'duration',
    'releaseDate',
    'endDate',
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update as string));
  if(updates.includes('image')) {
    const url = `${req.protocol}://${req.get('host')}`;
    const { file } = req;
    try {
      if (!file) {
        res.status(400).send('No file uploaded');
        return;
      }
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }
  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
    return;
  }

  try {
    const movie = await Movie.findById(_id);
    if (!movie) {
      res.sendStatus(404);
      return;
    }
    //@ts-ignore
    updates.forEach((update: keyof Model<LeanMovie>) => (movie[update] = req.body[update]));
    await movie.save();
    res.send(movie);
  } catch (e) {
    res.status(400).send(e);
  }
}));

/**
 * Deletes a movie by its ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the movie is deleted and sent in the response, or rejects with an error if there was a problem deleting the movie.
 */
export const deleteMovieById = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const movie = await Movie.findByIdAndDelete(_id);
    if (!movie) {
      res.sendStatus(404);
      return;
    }
    res.send(movie);
  } catch (e) {
    res.status(400).send(e);
  }
});
