import { z } from "zod";

export const CreateTransactionSchema = z.object({
  user_id: z.uuid(),
  event_id: z.uuid(),
  tickets: z.array(
    z.object({
      id: z.uuid(),
      holder_name: z.string().min(1),
      holder_email: z.email(),
    })
  ),
  coupon: z.object({
    id: z.uuid(),
  }),
  voucher: z.object({
    code: z.string().min(1),
    event_id: z.uuid(),
  }),
  points: z.array(
    z.object({
      id: z.uuid(),
      points_amount: z.number().int().nonnegative(),
      is_used: z.boolean(),
    })
  ),
});

export const GetEventTransactionSchema = z.object({
  event_id: z.uuid(),
});

export const GetTransactionByEventIdSchema = z.object({
  event_id: z.uuid(),
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
