import prisma from "../../lib/prisma";
import { AppError } from "../../classes/AppError.utils";

import { findUserById } from "./utils/dataFinder";
import { IVerifyUserParam } from "../../interfaces/auth.interface";
export default async function VerifyUserService(id: IVerifyUserParam) {
  try {
    const checkUser = await findUserById(id);
    if (!checkUser) throw new AppError(404, "user not found");
    const response = await prisma.user.update({
      where: {
        id,
      },
      data: {
        is_verified: true,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        is_verified: true,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
}
