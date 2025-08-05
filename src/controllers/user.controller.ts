import { Response, Request, NextFunction } from "express";
import { IUpdateUserAvatarParams } from "../interfaces/user.interface";
import UpdateUserAvatarService from "../Services/user.service/UpdateUserAvatar";

export async function UpdateUserAvatarController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { file } = req;
    const id = req.user?.id;
    const response = await UpdateUserAvatarService({
      avatar: file,
      id,
    } as IUpdateUserAvatarParams);

    res.status(201).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}
