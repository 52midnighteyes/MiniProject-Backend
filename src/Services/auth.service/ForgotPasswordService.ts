import prisma from "../../lib/prisma";
import { AppError } from "../../classes/AppError.utils";
import { findUserByEmail } from "./utils/dataFinder";
import { IForgotPasswordParams } from "../../interfaces/auth.interface";
import { compareSync } from "bcrypt";
import { genSaltSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../../config";

export default async function ForgotPasswordService(
  params: IForgotPasswordParams
) {
  try {
    const user = await findUserByEmail(params.email);

    if (!user) throw new AppError(404, "user not found");
    console.log("ini params", params.token, "ini token db", user.temp_token);

    if (params.token !== user.temp_token) {
      throw new AppError(404, "Unauthorized: Token does not match");
    }

    if (compareSync(params.password, user.password)) {
      throw new AppError(
        400,
        "New Password Can not be the same as the old password"
      );
    }

    const salt = genSaltSync(10);
    const hashed = hashSync(params.password, salt);

    const response = await prisma.$transaction(async (tx) => {
      const response = await tx.user.update({
        where: {
          email: params.email,
        },
        data: {
          password: hashed,
          temp_token: null,
          is_suspended: false,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          avatar: true,
          role: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return response;
    });

    if (!response) throw new AppError(404, "something went wrong");

    const token = sign(response, SECRET_KEY as string, {
      expiresIn: "1h",
    });

    return { response, token };
  } catch (err) {
    throw err;
  }
}
