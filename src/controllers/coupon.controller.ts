import { Request, Response, NextFunction } from "express";
import { AppError } from "../classes/AppError.utils";
import { GetCouponByIdService } from "../Services/coupons.service/GetCouponByIdService";
export async function GetCouponByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user_id = req.user?.id;

    const result = await GetCouponByIdService(user_id as string);

    if ("message" in result) {
      return res.status(200).json({
        message: result.message,
        data: [],
      });
    }

    return res.status(200).json({
      message: "Active coupons retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}
