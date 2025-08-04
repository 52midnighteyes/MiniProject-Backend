import prisma from "../../lib/prisma";
import { AppError } from "../../classes/AppError.utils";
import { IGetEORevenueByDateServiceParams } from "../../interfaces/transaction.interface";
import { DateFilter } from "../../utils/dateFilter";

export default async function getEORevenueStatisticByDateService(
  params: IGetEORevenueByDateServiceParams
) {
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
