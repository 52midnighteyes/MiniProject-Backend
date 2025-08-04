import prisma from "../../lib/prisma";
import { IDateFilterAttenders } from "../../interfaces/event.interface";
import { DateFilter } from "../../utils/dateFilter";

export default async function GetEventAttendersByDateService(
  params: IDateFilterAttenders
) {
  try {
    const response = await prisma.transactionList.aggregate({
      _count: {
        is_attending: true,
      },
      where: {
        ticketType: {
          event_id: params.event_id,
        },
        attending_at: {
          gte: DateFilter(params.days),
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
