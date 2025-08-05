import { Request, Response, NextFunction } from "express";
import GetEventAttendersByDateService from "../Services/event.service/GetEventAttendersByDateService";

export async function GetEventAttendersByDateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const days = parseInt(req.query.days as string);
    const event_id = req.query.event_id as string;
    const response = GetEventAttendersByDateService({ days, event_id });

    res.status(200).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}
