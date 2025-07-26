import { Request, Response, NextFunction } from "express";
import { AppError } from "../classes/AppError.utils";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { isDev } from "../config";
import jwt from "jsonwebtoken";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const devStatus = isDev !== "production";

  // Log error aman
  if (err instanceof Error) {
    console.error("[ERROR]", err.name, err.message);
    if (devStatus) console.error(err.stack);
  } else {
    console.error("[UNKNOWN ERROR]", err);
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(devStatus && { name: err.name, stack: err.stack }),
    });
  }

  if (err instanceof ZodError) {
    const z = err as ZodError<any>;
    return res.status(400).json({
      success: false,
      message: "Validation error",
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({
      success: false,
      message: "Database error",
      code: err.code,
    });
  }

  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({
      success: false,
      message: "Token has expired. Please login again.",
    });
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      message: "Invalid token. Authentication failed.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    ...(devStatus &&
      err instanceof Error && {
        name: err.name,
        stack: err.stack,
      }),
  });
}
