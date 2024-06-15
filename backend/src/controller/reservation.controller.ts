import Reservation from "@/model/reservation.model";
import { Request, Response } from "express";

/**
 * Creates a new reservation.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the reservation is created.
 */
export const createReservation = async (req: Request, res: Response): Promise<void> => {
  const reservation = new Reservation(req.body);
  try {
    await reservation.save();
    res.status(201).send({ reservation });
  } catch (e) {
    res.status(400).send(e);
  }
};

/**
 * Retrieves all reservations.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the reservations are retrieved.
 */
export const getAllReservations = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservations = await Reservation.find({});
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
    const reservation = await Reservation.findById(_id);
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
  const allowedUpdates = [
    'date',
    'startAt',
    'seats',
    'ticketPrice',
    'total',
    'username',
    'phone',
    'checkin',
  ];
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
    const reservation = await Reservation.findByIdAndDelete(_id);
    if (!reservation) {
      res.sendStatus(404);
      return;
    }
    res.send(reservation);
  } catch (e) {
    res.sendStatus(400);
  }
};