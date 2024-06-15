import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Genre } from '@/model/genre.model';

/**
 * Creates a new genre with the given request body.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the genre is created and sent in the response.
 * @throws {Error} If the genre cannot be saved.
 */
export const createGenre = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const genre = new Genre({ name, description });
  await genre.save();
  res.status(201).send(genre.toLeanDocument());
});

/**
 * Retrieves all genres.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when all genres are retrieved and sent in the response.
 */
export const getGenres = asyncHandler(async (req: Request, res: Response) => {
  const genres = await Genre.find({}).lean();
  res.send(genres);
});

/**
 * Retrieves a genre by its ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the genre is retrieved and sent in the response.
 * @throws {Error} If the genre with the specified ID cannot be found.
 */
export const getGenreById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const genre = await Genre.findById(id).lean();
  if (!genre) {
    res.status(404).send({ error: 'Genre not found' });
    return;
  }
  res.send(genre);
});

/**
 * Updates a genre by its ID with the given request body.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the genre is updated and sent in the response.
 * @throws {Error} If the genre with the specified ID cannot be found.
 */
export const updateGenreById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const genre = await Genre.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).lean();
  if (!genre) {
    res.status(404).send({ error: 'Genre not found' });
    return;
  }
  res.send(genre);
});

/**
 * Deletes a genre by its ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the genre is deleted and a response is sent.
 * @throws {Error} If the genre with the specified ID cannot be found.
 */
export const deleteGenreById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const genre = await Genre.findByIdAndDelete(id);
  if (!genre) {
    res.status(404).send({ error: 'Genre not found' });
    return;
  }
  res.send({ message: 'Genre deleted successfully' });
});
