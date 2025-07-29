import { AppError } from "../../classes/AppError.utils";
import {
  IGetAllTranscationByEventId,
  IGetAllTranscationByUserId,
  ITransactionParam,
} from "../../interfaces/transaction.interface";
import prisma from "../../lib/prisma";
import { randomCodeGenerator } from "../../utils/randomCode";
import {
  findTransactionByEventId,
  findTransactionByUserId,
} from "./utils/dataFinder";

export async function CreateTransactionRepo(params: ITransactionParam) {
  const tickets = await prisma.ticketType.findMany({
    where: {
      id: params.event_id,
      is_soldout: false,
    },
  });

  if (tickets.length === 0) {
    throw new AppError(404, "No ticket types found for this event");
  }

  if (params.tickets.length === 0) {
    throw new AppError(400, "No tickets provided");
  }

  for (let i = 0; i < params.tickets.length; i++) {
    const findSeat = tickets.find((tx) => tx.id === params.tickets[i].id);
    if (!findSeat) throw new AppError(404, "ticket not found");
    if (findSeat.available_seat < 1) {
      throw new AppError(404, "ticket sold out");
    }
  }

  const voucher = await prisma.voucher.findFirst({
    where: {
      code: params.voucher.code,
      event_id: params.voucher.event_id,
      is_available: true,
    },
  });

  if (!voucher)
    throw new AppError(404, "voucher is invalid or reached its limit");
  if (voucher.expired_date < new Date(Date.now()))
    throw new AppError(400, "voucher is expired");

  const points = await prisma.points.findMany({
    where: {
      user_id: params.user_id,
    },
  });

  for (const p of params.points) {
    const isPointValid = points.find(
      (tx) => tx.id === p.id && tx.is_used === false
    );
    if (!isPointValid)
      throw new AppError(404, "Point not found or already used");
  }

  const coupon = await prisma.coupon.findFirst({
    where: {
      id: params.coupon.id,
      user_id: params.user_id,
    },
  });

  if (!coupon)
    throw new AppError(404, "not enough point not found or already used");

  let totalPrice = 0;
  for (const t of params.tickets) {
    const matchedTicket = tickets.find((x) => x.id === t.id);
    if (matchedTicket) totalPrice += matchedTicket.price;
  }
  let pointsTotal = params.points.reduce((p, i) => p + i.points_amount, 0);

  let paidAmount = totalPrice - voucher.discount_amount - pointsTotal;
  if (coupon.discount_amount) {
    paidAmount -= paidAmount * Number(coupon.discount_amount);
  }

  if (paidAmount < 0) {
    paidAmount = 0;
  }

  try {
    const response = await prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          user_id: params.user_id,
          event_id: params.event_id,
          expired_at: new Date(Date.now() + 15 * 60 * 1000),
          total_price: paidAmount,
        },
        select: {
          id: true,
          user_id: true,
          event_id: true,
          expired_at: true,
          status: true,
          total_price: true,
        },
      });

      for (const ticket of params.tickets) {
        await tx.transactionList.create({
          data: {
            transaction_id: transaction.id,
            ticket_type_id: ticket.id,
            holder_name: ticket.holder_name,
            ticket_code: randomCodeGenerator(
              `TX${String(new Date().getMinutes()).padStart(
                2,
                "0"
              )}${ticket.holder_name.slice(0, 4).toUpperCase()}`
            ),
          },
        });
      }

      if (voucher.times_used + 1 >= voucher.quota) {
        await tx.voucher.update({
          where: { id: voucher.id },
          data: {
            times_used: { increment: 1 },
            is_available: false,
          },
        });
      } else {
        await tx.voucher.update({
          where: { id: voucher.id },
          data: {
            times_used: { increment: 1 },
          },
        });
      }

      for (const t of params.tickets) {
        await tx.ticketType.update({
          where: { id: t.id },
          data: {
            available_seat: {
              decrement: 1,
            },
          },
        });
      }

      for (const p of params.points) {
        await tx.points.update({
          where: { id: p.id },
          data: { is_used: true },
        });
      }

      return transaction;
    });

    return response;
  } catch (err) {
    throw err;
  }
}

export async function getAllTransactionByEventIdRepo(
  params: IGetAllTranscationByEventId
) {
  try {
    const response = await findTransactionByEventId(params.event_id);
    if (!response) throw new AppError(404, "data not found");
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getAllTransactionByUserIdRepo(
  params: IGetAllTranscationByUserId
) {
  try {
    const response = await findTransactionByUserId(params.user_id);
    if (!response) throw new AppError(404, "data not found");
    return response;
  } catch (err) {
    throw err;
  }
}

export async function UpdatePaymentRepo(params: type) {}
