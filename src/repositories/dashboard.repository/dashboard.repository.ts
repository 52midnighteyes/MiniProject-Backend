import { response } from "express";
import { AppError } from "../../classes/AppError.utils";
import {
  IDateFilterAttenders,
  IDateFilterEOTransaction,
  IDateFilterTransaction,
  IEventAttenderParams,
} from "../../interfaces/dashboard.interface";
import prisma from "../../lib/prisma";

function DateFilter(days: number) {
  const response = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  return response;
}

export async function getEventRevenueByDateRepo(
  params: IDateFilterTransaction
) {
  try {
    const response = await prisma.$transaction(async (tx) => {
      const totalRevenue = await tx.transaction.aggregate({
        _sum: {
          total_price: true,
        },
        where: {
          event_id: params.event_id,
          created_at: {
            gte: DateFilter(params.days),
          },
          status: "PAID",
        },
      });

      const totalTicketSold = await tx.transactionList.aggregate({
        _count: {
          id: true,
        },
        where: {
          transaction: {
            event_id: params.event_id,
            created_at: {
              gte: DateFilter(params.days),
            },
            status: "PAID",
          },
        },
      });

      return {
        total_revenue: totalRevenue._sum.total_price || 0,
        total_tickets_sold: totalTicketSold._count.id || 0,
      };
    });
    if (!response) throw new AppError(404, "data not found");
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getEventAttendersRepo(params: IEventAttenderParams) {
  try {
    const response = await prisma.transactionList.aggregate({
      _count: {
        is_attending: true,
      },
      where: {
        ticketType: {
          event_id: params.event_id,
        },
        is_attending: true,
      },
    });

    if (!response) throw new AppError(404, "data not found");
    return response._count.is_attending || 0;
  } catch (err) {
    throw err;
  }
}

export async function GetEventAttendersByDateRepo(
  params: IDateFilterAttenders
) {
  try {
    const response = await prisma.transactionList.findMany({
      where: {
        ticketType: {
          event_id: params.event_id,
        },
        attending_at: {
          gte: DateFilter(params.days),
        },
      },
    });

    if (response.length === 0) {
      throw new AppError(404, "data not found");
    }

    return response;
  } catch (err) {
    throw err;
  }
}

export async function getEORevenueByDateRepo(params: IDateFilterEOTransaction) {
  try {
    const response = await prisma.$transaction(async (tx) => {
      const totalRevenue = await tx.transaction.aggregate({
        _sum: {
          total_price: true,
        },
        where: {
          event: {
            organizer_id: params.organizer_id,
          },
          created_at: {
            gte: DateFilter(params.days),
          },
          status: "PAID",
        },
      });

      return {
        total_revenue: totalRevenue._sum.total_price || 0,
      };
    });
    if (!response) throw new AppError(404, "data not found");
    return response;
  } catch (err) {
    throw err;
  }
}
