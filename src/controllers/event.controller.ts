import { Request, Response, NextFunction } from "express";
import GetEventAttendersByDateService from "../Services/event.service/GetEventAttendersByDateService";

export async function GetEventAttendersByDateController(
  req: Request,
  Res: Response,
  next: NextFunction
) {
  try {
    const days = parseInt(req.query.days as string);
    const event_id = req.query.event_id as string;
    const response = GetEventAttendersByDateService({ days, event_id });
  } catch (err) {
    next(err);
  }
}
