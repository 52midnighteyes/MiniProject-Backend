import prisma from "../../lib/prisma";
import { IDateFilterAttenders } from "../../interfaces/event.interface";

export default async function GetEventAttendersByDateService(
  params: IDateFilterAttenders
) {
  try {
    const response = await prisma.transaction.aggregate({
      _count: {
        is_attending: true,
      },
      where: {
        ticketType: {
          event_id: params.event_id,
        },
      },
    });

    if (!response) {
      return 0;
    }

    return response._count.is_attending;
  } catch (err) {
    throw err;
  }
}
