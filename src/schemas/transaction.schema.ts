import { z } from "zod";

export const CreateTransactionSchema = z.object({
  event_id: z.string().nonempty("Event ID is required"),
  ticket_type_id: z.string().nonempty("Ticket Type is required"),
  coupon_code: z.string().optional().nullable(),
  points_id: z.string().optional().nullable(),
  voucher_code: z.string().optional().nullable(),
});

export const GetEventTransactionSchema = z.object({
  event_id: z.string(),
});

export const GetTransactionByEventIdSchema = z.object({
  event_id: z.string(),
  days: z.number().int().positive(),
});

export const GetTransactionByUserIdSchema = z.object({
  user_id: z.uuid(),
});

export const GetEventRevenueByDateSchema = z.object({
  event_id: z.uuid(),
  days: z.number().int().positive(),
});

export const GetEORevenueByDateServiceSchema = z.object({
  organizer_id: z.uuid(),
  days: z.number().int().positive(),
});

export const CreatePaymentSchema = z.object({});
