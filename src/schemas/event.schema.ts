import { z } from "zod";

export const GetEventAttendersByDateSchema = z.object({
  event_id: z.uuid().trim().nonempty(),
});

export const GetEventDetailsByIdSchema = z.object({
  event_id: z.string().trim().nonempty(),
});
