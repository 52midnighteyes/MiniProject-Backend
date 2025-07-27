import { Request, Response, NextFunction, response } from "express";
import {
  RegisterRepo,
  VerifyUserRepo,
  ForgotPasswordRepo,
  ForgotPasswordReqRepo,
  resetPassowordRepo,
  LoginRepo,
} from "../repositories/auth.repository";
import { AppError } from "../classes/AppError.utils";
import { IUserParams } from "../user";

export async function RegisterController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await RegisterRepo(req.body);

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
    const response = await LoginRepo({ ...req.body });

    res.status(210).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

export async function VerifyUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.query.id;
    const response = await VerifyUserRepo(id as string);

    res.status(201).json({
      messsage: "successfull",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

export async function resetPassowordController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.user as IUserParams;
    await resetPassowordRepo({ ...req.body, email });

    res.status(201).json({
      message: "password has changed",
    });
  } catch (err) {
    next(err);
  }
}

export async function ForgotPasswordReqController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const email: string = req.body.email;
    await ForgotPasswordReqRepo(email);

    res.status(201).json({
      message: "email sent",
    });
  } catch (err) {
    next(err);
  }
}

export async function ForgotPasswordController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.user as IUserParams;
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();
    if (!token)
      throw new AppError(401, "Unauthorized: Invalid or expired token");
    const response = await ForgotPasswordRepo({ ...req.body, email, token });

    res.status(201).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}
