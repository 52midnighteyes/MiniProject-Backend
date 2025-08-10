import { IConfirmTransactionParams } from "../../interfaces/transaction.interface";
import prisma from "../../lib/prisma";
import { randomCodeGenerator } from "../../utils/randomCode";
import { AppError } from "../../classes/AppError.utils";

export default async function CreatePaymentConfirmationService(
  params: IConfirmTransactionParams
) {
  let notes = "";
  if (params.notes) notes = params.notes;

  try {
    const transaction = await prisma.transaction.findFirst({
      where: { id: params.transaction_id },
      include: {
        event: {
          select: {
            name: true,
            organizer_id: true,
          },
        },
      },
    });

    if (!transaction) throw new AppError(404, "event not found");
    if (params.organizer_id !== transaction.event.organizer_id)
      throw new AppError(403, "unauthorized");

    const ticket = await prisma.ticketType.findFirst({
      where: {
        id: transaction.ticket_type_id,
      },
    });

    if (!ticket) throw new AppError(404, "invalid ticket id");
    if (ticket.is_soldout) {
      prisma.transaction.update({
        where: {
          id: params.transaction_id,
        },
        data: {
          status: "CANCELED",
          admin_notes: "Already Sold Out",
        },
      });

      throw new AppError(404, "no seat found");
    }

    const response = await prisma.$transaction(async (tx) => {
      const txs = await tx.transaction.update({
        where: {
          id: params.transaction_id,
        },
        data: {
          status: params.status,
          admin_notes: notes,
          ticket_code: randomCodeGenerator(
            `TX${transaction.event.name.slice(4, 7)}`
          ),
        },
      });

      const checkTicket = await tx.ticketType.findFirst({
        where: {
          id: transaction.ticket_type_id,
        },
      });
    });

    if (ticket) return transaction;
  } catch (err) {
    throw err;
  }
}
