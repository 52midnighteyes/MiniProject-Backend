import { z } from "zod";

export const GetEventAttendersByDateSchema = z.object({
  days: z.number().int().positive(),
  event_id: z.uuid().trim().nonempty(),
});
