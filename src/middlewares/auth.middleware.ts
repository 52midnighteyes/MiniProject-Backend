import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { AppError } from "../classes/AppError.utils";
import { IUserParams } from "../user";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      throw new AppError(401, "Unauthorized: Invalid or expired token");
    const decoded = verify(token, SECRET_KEY as string);

    req.user = decoded as IUserParams;

    next();
  } catch (err) {
    return next(new AppError(401, "Unauthorized: Invalid or expired token"));
  }
}
