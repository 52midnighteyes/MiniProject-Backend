import prisma from "../../lib/prisma";
import { AppError } from "../../classes/AppError.utils";
import { IGetEventRevenueByDateParams } from "../../interfaces/transaction.interface";
import { DateFilter } from "../../utils/dateFilter";

export default async function GetEventRevenueByDateService(
  params: IGetEventRevenueByDateParams
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
