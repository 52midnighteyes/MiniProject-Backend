import { Request, Response, NextFunction } from "express";
import GetPointsByIdService from "../Services/point.services/GetPointsByIdService";

export async function GetPointsByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.user?.id as string;
    const response = await GetPointsByIdService({ id });
    res.status(200).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}
