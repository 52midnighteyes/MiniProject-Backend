import { Request, Response, NextFunction, response } from "express";

import {
  CreateTransactionRepo,
  getAllTransactionByEventIdRepo,
  getAllTransactionByUserIdRepo,
} from "../repositories/transactions.repository/transaction.respository";
import { ITransactionParam } from "../interfaces/transaction.interface";

export async function CreateTransactionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data: ITransactionParam = req.body;
    const response = await CreateTransactionRepo(data);
    res.status(201).json({
      message: "transaction created",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAllTransactionByEventIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await getAllTransactionByEventIdRepo({ ...req.body });
    res.status(201).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAllTransactionByUserIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await getAllTransactionByUserIdRepo({ ...req.body });
    res.status(201).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}
