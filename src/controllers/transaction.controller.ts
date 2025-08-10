import { Request, Response, NextFunction, response } from "express";
import CreateTransactionService from "../Services/transaction.service/CreateTransactionService";
import GetTransactionsByEventIdService from "../Services/transaction.service/GetAllEventTransactionByIdService";
import GetTransactionByUserIdService from "../Services/transaction.service/GetAllUserTransactionByIdService";
import getEORevenueStatisticByDateService from "../Services/transaction.service/GetAllOrganizerRevenueByIdService";
import UpdateTransaction from "../Services/transaction.service/UpdateTransactionService";
import CreatePaymentService from "../Services/transaction.service/UpdatePaymentProofService";
import ConfirmPaymentService from "../Services/transaction.service/UpdatePaymentConfirmationService";

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

export async function UpdateTransactionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, status } = req.body;

    const updated = await UpdateTransaction({
      id,
      status,
    });

    return res.status(200).json({
      message: "Transaction status updated successfully",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}

export async function CreatePaymentController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user_id = req.user?.id;
    const response = await CreatePaymentService({ user_id, ...req.body });

    res.status(201).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

export async function ConfirmPaymentController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const organizer_id = req.user?.id;
    const response = await ConfirmPaymentService({ ...req.body, organizer_id });

    res.status(201).json({
      message: "ok",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}
