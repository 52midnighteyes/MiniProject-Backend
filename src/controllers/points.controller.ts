import { Request, Response, NextFunction } from "express";
import GetPointsByIdService from "../Services/point.services/GetPointsByIdService";
import { AppError } from "../classes/AppError.utils";
export async function GetPointsByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id: string | undefined = req.user?.id;

    if (!id) {
      throw new AppError(401, "Unauthorized");
    }

    const response = await GetPointsByIdService({ id });

    res.status(200).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}
