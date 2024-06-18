import { Request, Response } from 'express';
import Reservation from '@/model/reservation.model';

/*
TODO: Some functionality needs to corrected here like current user can checkin only their reservations
checkin can be done only once,
delete can be done only by superadmin or may be with some other role like admin or cinema admin , by user only
cancel can be done only by superadmin or may be with some other role like admin or cinema admin , by user only
*/

/**
 * Creates a new reservation.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the reservation is created.
 */
export const createReservation = async (req: Request, res: Response): Promise<void> => {
  if (req.body?.userId !== req.user?._id) {
    res.status(401).send('Unauthorized');
    return;
  }

  const reservation = new Reservation(req.body);
  try {
    await reservation.save();
    res.status(201).send({ reservation });
  } catch (e) {
    res.status(400).send(e);
  }
};

/**
 * Retrieves all reservations for the current user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the reservations are retrieved.
 */
export const getAllReservations = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.sendStatus(401);
      return;
    }
    const reservations = await Reservation.find({ userId: user._id })
      .populate({
        path: 'showtimeId',
        populate: [{ path: 'movieId' }, { path: 'cinemaId' }],
      })
      .exec();
    res.send(reservations);
  } catch (e) {
    res.status(400).send(e);
  }
};

/**
 * Retrieves a reservation by its ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the reservation is retrieved.
 */
export const getReservationById = async (req: Request, res: Response): Promise<void> => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findById(_id).populate('showtimeId', 'movieId cinemaId').exec();
    if (!reservation) {
      res.sendStatus(404);
      return;
    }
    res.send(reservation);
  } catch (e) {
    res.status(400).send(e);
  }
};

/**
 * Checks in a reservation by its ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the reservation is checked in.
 */
export const checkinReservationById = async (req: Request, res: Response): Promise<void> => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findById(_id);
    if (!reservation) {
      res.sendStatus(404);
      return;
    }
    if (reservation.userId.toString() !== req.user?._id.toString()) {
      res.status(401).send('Unauthorized');
      return;
    }
    if (reservation.checkin) {
      res.status(400).send('Reservation already checked in');
      return;
    }
    reservation.checkin = true;
    await reservation.save();
    res.send(reservation);
  } catch (e) {
    res.status(400).send(e);
  }
};

/**
 * Updates a reservation by its ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the reservation is updated.
 */
export const updateReservationById = async (req: Request, res: Response): Promise<void> => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['date', 'startAt', 'seats', 'ticketPrice', 'total', 'userId', 'phone', 'checkin'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
    return;
  }

  try {
    const reservation = await Reservation.findById(_id);
    if (!reservation) {
      res.sendStatus(404);
      return;
    }
    if (reservation.userId.toString() !== req.user?._id.toString()) {
      res.status(401).send('Unauthorized');
      return;
    }
    updates.forEach((update) => {
      (reservation as any)[update] = req.body[update];
    });
    await reservation.save();
    res.send(reservation);
  } catch (e) {
    res.status(400).send(e);
  }
};

/**
 * Deletes a reservation by its ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the reservation is deleted.
 */
export const deleteReservationById = async (req: Request, res: Response): Promise<void> => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findById(_id);
    if (!reservation) {
      res.sendStatus(404);
      return;
    }
    if (reservation.userId.toString() !== req.user?._id.toString()) {
      res.status(401).send('Unauthorized');
      return;
    }
    const removedReservation = await Reservation.findByIdAndDelete(_id);
    res.send(reservation);
  } catch (e) {
    res.status(400).send(e);
  }
};
