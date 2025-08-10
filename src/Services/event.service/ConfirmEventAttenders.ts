import { AppError } from "../../classes/AppError.utils";
import { IConfirmEventAttendersParams } from "../../interfaces/event.interface";
import prisma from "../../lib/prisma";
import { findUserById } from "../auth.service/utils/dataFinder";

export default async function ConfirmEventAttendersService(
  params: IConfirmEventAttendersParams
) {
  try {
    const organizer = await findUserById(params.organizer_id);
    if (!organizer) throw new AppError(404, "no organizer found");
    const transaction = await prisma.transaction.findFirst({
      where: {
        ticket_code: params.ticket_code,
      },
      include: {
        event: true,
      },
    });

    if (!transaction) throw new AppError(404, "no event found");

    if (params.organizer_id !== transaction.event.organizer_id)
      throw new AppError(403, "unauthorized");

    const response = await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        is_attending: true,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
}
