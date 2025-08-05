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
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();
    if (!token) throw new AppError(401, "Unauthorized: No token found");
    const decoded = verify(token, SECRET_KEY as string);

    req.user = decoded as IUserParams;

    next();
  } catch (err) {
    next(err);
  }
}

export function AdminGuard(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req?.user;
      if (!user || !allowedRoles.includes(user.role.name)) {
        throw new AppError(
          403,
          "Forbidden: You do not have access to this resource"
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}
