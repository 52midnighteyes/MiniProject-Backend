import { Request, Response, NextFunction, response } from "express";
import GetEventAttendersByDateService from "../Services/event.service/GetEventAttendersByDateService";
import CreateEventService from "../Services/event.service/CreateEventService";
import { GetEventDetailsByIdService } from "../Services/event.service/GetEventDetailsService";
import ConfirmEventAttendersService from "../Services/event.service/ConfirmEventAttenders";

export async function GetEventAttendersByDateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const event_id = req.query.event_id as string;
    const response = GetEventAttendersByDateService({ event_id });

    res.status(200).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

export async function CreateEventController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const organizer_id = req.user?.id;

    const event = await CreateEventService({
      ...req.body,
      organizer_id,
    });

    return res.status(201).json({
      message: "Event created successfully",
      data: event,
    });
  } catch (err) {
    next(err);
  }
}

export async function GetEventDetailsByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const event_id = req.query.event_id as string;

    const event = await GetEventDetailsByIdService({
      event_id,
    });

    return res.status(200).json({
      message: "success",
      data: event,
    });
  } catch (err) {
    next(err);
  }
}

export async function ConfirmEventAttendersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const organizer_id = req.user?.id as string;
    const ticket_code = req.query.ticket_code as string;
    const response = await ConfirmEventAttendersService({
      organizer_id,
      ticket_code,
    });

    res.status(201).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}
