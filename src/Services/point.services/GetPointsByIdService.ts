import { IGetPointsByIdParams } from "../../interfaces/points.interface";
import prisma from "../../lib/prisma";

export default async function GetPointsByIdService(
  params: IGetPointsByIdParams
) {
  try {
    const response = await prisma.$transaction(async (tx) => {
      const points = await tx.points.findMany({
        where: {
          user_id: params.id,
          expired_date: {
            gte: new Date(),
          },
          is_used: false,
        },
      });

      if (points.length === 0) {
        return {
          points: [],
          totalPoints: 0,
        };
      }

      const totalPoints = await tx.points.aggregate({
        _sum: {
          points_amount: true,
        },
        where: {
          user_id: params.id,
          expired_date: {
            gte: new Date(),
          },
          is_used: false,
        },
      });

      return {
        points,
        totalPoints: totalPoints._sum.points_amount || 0,
      };
    });

    return response;
  } catch (err) {
    throw err;
  }
}
