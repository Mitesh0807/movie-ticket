import { Request, Response, NextFunction } from 'express';
import Cinema from '@/model/cinema.model';

/**
 * Creates a new cinema.
 *
 * @param {Request} req - The request object containing the cinema data in the body.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the cinema is created and sent in the response, or rejects with an error if there was a problem creating the cinema.
 */
export const createCinema = async (req: Request, res: Response): Promise<void> => {
  const cinema = new Cinema(req.body);
  try {
    await cinema.save();
    res.status(201).send(cinema);
  } catch (e) {
    res.status(400).send(e);
  }
};

/**
 * Uploads a cinema photo.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<void>} A promise that resolves when the photo is uploaded and sent in the response, or rejects with an error if there was a problem uploading the photo.
 */
export const uploadCinemaPhoto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const url = `${req.protocol}://${req.get('host')}`;
  const { file } = req;
  const cinemaId = req.params.id;

  try {
    if (!file) {
      const error = new Error('Please upload a file');
      (error as any).httpStatusCode = 400;
      return next(error);
    }

    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      res.sendStatus(404);
      return;
    }

    cinema.image = `${url}/${file.path}`;
    await cinema.save();
    res.send({ cinema, file });
  } catch (error) {
    console.error(error);
    res.sendStatus(400).send(error);
  }
};

/**
 * Retrieves all cinemas.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the cinemas are retrieved and sent in the response, or rejects with an error if there was a problem retrieving the cinemas.
 */
export const getAllCinemas = async (req: Request, res: Response): Promise<void> => {
  try {
    const cinemas = await Cinema.find({});
    res.send( cinemas );
  } catch (e) {
    res.status(400).send(e);
  }
};

/**
 * Retrieves a cinema by its ID.
 *
 * @param {Request} req - The request object containing the cinema ID in the params.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the cinema is retrieved and sent in the response, or rejects with an error if there was a problem retrieving the cinema.
 */
export const getCinemaById = async (req: Request, res: Response): Promise<void> => {
  const _id = req.params.id;
  try {
    /**
     * The retrieved cinema.
     * @type {Cinema|null}
     */
    const cinema = await Cinema.findById(_id);
    if (!cinema) {
      res.sendStatus(404);
      return;
    }
    res.send(cinema);
  } catch (e) {
    res.status(400).send(e);
  }
};

/**
 * Updates a cinema by its ID with the given request body.
 *
 * @param {Request} req - The request object containing the cinema ID in the params and the updates in the body.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the cinema is updated and sent in the response, or rejects with an error if there was a problem updating the cinema.
 */
export const updateCinemaById = async (req: Request, res: Response): Promise<void> => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'ticketPrice', 'city', 'seats', 'seatsAvailable'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
    return;
  }

  try {
    const cinema = await Cinema.findById(_id);
    if (!cinema) {
      res.sendStatus(404);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    updates.forEach(update => cinema[update] = req.body[update]); 
    await cinema.save();
    res.send(cinema);
  } catch (e) {
    res.status(400).send(e);
  }
};

/**
 * Deletes a cinema by its ID.
 *
 * @param {Request} req - The request object containing the cinema ID in the params.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the cinema is deleted and sent in the response, or rejects with an error if there was a problem deleting the cinema.
 */
export const deleteCinemaById = async (req: Request, res: Response): Promise<void> => {
  const _id = req.params.id;
  try {
    const cinema = await Cinema.findByIdAndDelete(_id);
    if (!cinema) {
      res.sendStatus(404);
      return;
    }
    res.send(cinema);
  } catch (e) {
    res.sendStatus(400);
  }
};
