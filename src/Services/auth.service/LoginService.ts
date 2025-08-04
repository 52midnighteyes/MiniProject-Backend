import prisma from "../../lib/prisma";
import { AppError } from "../../classes/AppError.utils";
import { findUserByEmail } from "./utils/dataFinder";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../../config";
import { ILoginParams } from "../../interfaces/auth.interface";
import { compareSync } from "bcrypt";
import { IUserParams } from "../../user";

export default async function LoginService(params: ILoginParams) {
  try {
    const user = await findUserByEmail(params.email);
    if (!user) throw new AppError(404, "Email or Password is invalid");

    if (user.is_suspended) {
      throw new AppError(
        403,
        "Your account is temporarily disabled, please check your email"
      );
    }

    const isPasswordMatch = compareSync(params.password, user.password);
    if (!isPasswordMatch) {
      const failedCounter = await prisma.user.update({
        where: { id: user.id },
        data: {
          login_attempt: user.login_attempt + 1,
        },
        select: {
          login_attempt: true,
        },
      });

      //future update
      //20x failed -> suspend account -> kirim email untuk change pass

      if (failedCounter.login_attempt >= 5) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            login_time_out: new Date(Date.now() + 15 * 60 * 1000),
          },
        });

        throw new AppError(
          403,
          "Too many failed attempts. Try again 15 minutes later."
        );
      }

      throw new AppError(404, "Email or Password is invalid");
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id },
        data: {
          login_attempt: 0,
        },
      });
    });

    const response: IUserParams = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    };

    const token = sign(response, SECRET_KEY as string, {
      expiresIn: "2h",
    });

    return { response, token };
  } catch (err) {
    throw err;
  }
}
