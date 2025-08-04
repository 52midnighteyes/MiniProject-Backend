import { AppError } from "../../classes/AppError.utils";
import { IGetPointsByIdParams } from "../../interfaces/points.interface";
import prisma from "../../lib/prisma";

export default async function GetPointsByIdService(
  params: IGetPointsByIdParams
) {
  try {
    const response = await prisma.$transaction(async (tx) => {
      const points = await tx.points.findMany({
        where: {
          id: params.id,
        },
      });

      if (points.length === 0) throw new AppError(404, "data not found");
      const totalPoints = await tx.points.aggregate({
        _count: {
          points_amount: true,
        },
      });

      return { points, totalPoints: totalPoints._count.points_amount };
    });
    return response;
  } catch (err) {
    throw err;
  }
}
