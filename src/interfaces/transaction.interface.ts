import { TransactionStatus } from "@prisma/client";

export interface ICreateTransactionParams {
  user_id: string;
  event_id: string;
  ticket_type_id: string;
  coupon_code?: string;
  points_id?: string;
  voucher_code?: string;
}

export interface IGetAllEventTransactionByIdParams {
  event_id: string;
}

export interface IGetRevenueQueryParams {
  event_id: string;
  days: number;
}

export interface IGetAllUserTransactionByIdParams {
  user_id: string;
}

export interface IGetEventRevenueByDateParams {
  event_id: string;
  days: number;
}

export interface IGetOrganizerRevenueByDateServiceParams {
  days: number;
  organizer_id: string;
}

export interface IGetTransactionDataGroupByDateService {
  days: string;
}

export interface IUpdateTransactionStatus {
  id: string;
  status: TransactionStatus;
}

export interface ICreatePaymentService {
  transaction_id: string;
  user_id: string;
  payment_proof: Express.Multer.File;
}

export interface IConfirmTransactionParams {
  status: TransactionStatus;
  transaction_id: string;
  organizer_id: string;
  notes?: string;
}
