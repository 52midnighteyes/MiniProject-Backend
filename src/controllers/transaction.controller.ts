import { Request, Response, NextFunction, response } from "express";
import CreateTransactionService from "../Services/transaction.service/CreateTransactionService";
import GetTransactionsByEventIdService from "../Services/transaction.service/GetTransactionsByEventIdService";
import GetTransactionByUserIdService from "../Services/transaction.service/GetTransactionByUserIdService";
import GetEventRevenueStatistikByDateService from "../Services/transaction.service/GetEventRevenueByDateService";
import getEORevenueStatisticByDateService from "../Services/transaction.service/GetEORevenueStatisticByDateService";

export async function CreateTransactionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await CreateTransactionService({
      ...req.body,
      user_id: req.user?.id,
    });
    res.status(201).json({
      message: "transaction created",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

export async function GetTransactionByEventIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await GetTransactionsByEventIdService({ ...req.body });
    res.status(201).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

export async function GetTransactionByUserIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await GetTransactionByUserIdService({ ...req.body });
    res.status(201).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

export async function GetEventRevenueByDateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await GetEventRevenueStatistikByDateService({
      ...req.body,
    });
    res.status(201).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

export async function GetEORevenueStatisticByDateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await getEORevenueStatisticByDateService({
      ...req.body,
    });
    res.status(201).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}
