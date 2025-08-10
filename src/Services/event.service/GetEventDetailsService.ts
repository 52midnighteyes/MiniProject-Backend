import { AppError } from "../../classes/AppError.utils";
import { IGetEventDetailsById } from "../../interfaces/event.interface";
import prisma from "../../lib/prisma";

export async function GetEventDetailsByIdService(params: IGetEventDetailsById) {
  try {
    const response = await prisma.event.findUnique({
      where: {
        id: params.event_id,
      },
      include: {
        eventCategories: true,
        ticketTypes: true,
      },
    });

    if (!response) throw new AppError(404, "data not found");

    return response;
  } catch (err) {
    throw err;
  }
}
