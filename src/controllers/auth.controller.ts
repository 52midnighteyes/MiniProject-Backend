import { Request, Response, NextFunction, response } from "express";
import { RegisterRepo, VerifyUserRepo } from "../repositories/auth.repository";
import { AppError } from "../classes/AppError.utils";

export async function RegisterController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await RegisterRepo(req.body);

    console.log("ini nih yang gue cari", response);
    res.status(201).json({
      message: "registration success",
      data: response,
    });
  } catch (err) {
    if (err instanceof AppError) return next(err);

    console.error("Unexpected Register Error:", err);
    next(new AppError(500, "Internal Server Error"));
  }
}

export async function LoginUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (err) {
    throw err;
  }
}

export async function VerifyUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.query.id;
    console.log("ini idnya", id);
    if (!id) throw new AppError(404, "wrong input");
    const response = await VerifyUserRepo(id as string);

    res.status(201).json({
      messsage: "successfull",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}
