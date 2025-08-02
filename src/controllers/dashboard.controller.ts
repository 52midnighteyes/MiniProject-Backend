import { Response, Request, NextFunction, response } from "express";
import {
  getEORevenueByDateRepo,
  getEvenRevenueByDateRepo,
  GetEventAttendersByDateRepo,
  getEventAttendersRepo,
} from "../repositories/dashboard.repository/dashboard.repository";

export async function getEvenRevenueByDateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const days = parseInt(req.query.days as string) || 7;
    const event_id = req.query.event_id as string;

    const response = await getEvenRevenueByDateRepo({ days, event_id });

    res.status(201).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

export async function getEORevenueByDateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const days = parseInt(req.query.days as string) || 7;
    const organizer_id = req.query.organizer_id as string;

    const response = await getEORevenueByDateRepo({ days, organizer_id });

    res.status(201).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

export async function getEventAttendersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const days = parseInt(req.params.days as string) || 1;
    const event_id: string = req.params.event_id;

    const response = await getEventAttendersRepo({ event_id });

    res.status(201).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

export async function getEventAttendersByDateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const days = parseInt(req.query.days as string) || 7;
    const event_id = req.query.event_id as string;

    const response = await GetEventAttendersByDateRepo({ days, event_id });

    res.status(201).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}
