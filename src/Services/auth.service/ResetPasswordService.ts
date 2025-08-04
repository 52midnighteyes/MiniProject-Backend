import prisma from "../../lib/prisma";
import { AppError } from "../../classes/AppError.utils";
import { findUserByEmail } from "./utils/dataFinder";
import { compareSync } from "bcrypt";
import { genSaltSync, hashSync } from "bcrypt";
import { IResetPasswordParams } from "../../interfaces/auth.interface";

export default async function resetPassowordService(
  params: IResetPasswordParams
) {
  try {
    const response = await findUserByEmail(params.email);
    if (!response) throw new AppError(404, "data not found");
    const isOldPasswordMatch = compareSync(
      params.old_password,
      response.password
    );
    if (!isOldPasswordMatch)
      throw new AppError(400, "old password doesn't match");

    const salt = genSaltSync(10);
    const hashed = hashSync(params.new_password, salt);

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          email: params.email,
        },
        data: {
          password: hashed,
        },
      });
    });
  } catch (err) {
    throw err;
  }
}
