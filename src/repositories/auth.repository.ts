import { AppError } from "../classes/AppError.utils";
import { IRegisterParam } from "../interfaces/auth.interface";
import { findUserByEmail, findUserByRefferal } from "../utils/dataFinder";
import prisma from "../lib/prisma";

export async function RegisterRepo(params: IRegisterParam) {
  try {
    const emailCheck = await findUserByEmail(params.email);
    if (emailCheck) throw new AppError(409, "email already registered");

    const response = await prisma.$transaction(async (tx) => {
      let reffOwner = null;
      if (params.refferal_code) {
        reffOwner = await tx.user.findFirst({
          select: {
            id: true,
          },
          where: {
            referal_code: params.refferal_code,
          },
        });

        if (!reffOwner) return console.log("no refferal");

        const threeMonthsLater = new Date();
        threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

        await tx.points.create({
          data: {
            user_id: reffOwner.id,
            expired_date: threeMonthsLater,
          },
        });
      }
    });

    return response;
  } catch (err) {
    throw new AppError(404, "failed");
  }
}
