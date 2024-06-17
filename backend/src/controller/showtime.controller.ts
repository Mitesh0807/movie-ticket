import { Request, Response } from 'express';
import Showtime from '@/model/showtime.model';


/**
 * Creates a new showtime.
 *
 * @param {Request} req - The request object containing the showtime data in the body.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the showtime is created and sent in the response, or rejects with an error if there was a problem creating the showtime.
 */
export const createShowtime = async (req: Request, res: Response): Promise<void> => {
  const showtime = new Showtime(req.body);
  try {
    await showtime.save();
    res.status(201).send(showtime);
  } catch (e) {
    res.status(400).send(e);
  }
};


/**
 * Retrieves all showtimes.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the showtimes are retrieved and sent in the response, or rejects with an error if there was a problem retrieving the showtimes.
 */
export const getAllShowtimes = async (req: Request, res: Response): Promise<void> => {
  try {
    const showtimes = await Showtime.find({}).populate('movieId').populate('cinemaId');
    res.send(showtimes);
  } catch (e) {
    res.status(400).send(e);
  }
};


/**
 * Retrieves a showtime by its ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the showtime is retrieved and sent in the response, or rejects with an error if there was a problem retrieving the showtime.
 */
export const getShowtimeById = async (req: Request, res: Response): Promise<void> => {
  const _id = req.params.id;
  try {
    const showtime = await Showtime.findById(_id);
    if (!showtime) {
      res.sendStatus(404);
      return;
    }
    res.send(showtime);
  } catch (e) {
    res.status(400).send(e);
  }
};

/**
 * Updates a showtime by its ID with the given request body.
 *
 * @param {Request} req - The request object containing the showtime ID in the params and the updates in the body.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the showtime is updated and sent in the response, or rejects with an error if there was a problem updating the showtime.
 */
export const updateShowtimeById = async (req: Request, res: Response): Promise<void> => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['startAt', 'startDate', 'endDate', 'movieId', 'cinemaId'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
    return;
  }

  try {
    const showtime = await Showtime.findById(_id);
    if (!showtime) {
      res.sendStatus(404);
      return;
    }

    updates.forEach((update) => {
      (showtime as any)[update] = req.body[update];
    });
    await showtime.save();
    res.send(showtime);
  } catch (e) {
    res.status(400).send(e);
  }
};


/**
 * Deletes a showtime by its ID.
 *
 * @param {Request} req - The request object containing the showtime ID in the params.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the showtime is deleted and sent in the response, or rejects with an error if there was a problem deleting the showtime.
 */
export const deleteShowtimeById = async (req: Request, res: Response): Promise<void> => {
  const _id = req.params.id;
  try {
    const showtime = await Showtime.findByIdAndDelete(_id);
    if (!showtime) {
      res.sendStatus(404);
      return;
    }
    res.send(showtime);
  } catch (e) {
    res.sendStatus(400);
  }
};
