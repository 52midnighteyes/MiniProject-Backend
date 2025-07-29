import { AppError } from "../../classes/AppError.utils";
import {
  IForgotPasswordParams,
  IForgotPasswordReqParam,
  ILoginParams,
  IRegisterParams,
  IResetPasswordParams,
  IVerifyUserParam,
} from "../../interfaces/auth.interface";
import { findUserByEmail } from "./utils/dataFinder";
import prisma from "../../lib/prisma";
import { sign } from "jsonwebtoken";
import { FE_URL, SECRET_KEY } from "../../config";
import { randomCodeGenerator } from "../../utils/randomCode";

import { IUserParams } from "../../user";

import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

import { genSaltSync, hashSync } from "bcrypt";
import mailer from "../../lib/nodemailer";
import { compareSync } from "bcrypt";

async function findUserById(id: string) {
  const response = await prisma.user.findFirst({
    select: {
      id: true,
    },
    where: {
      id,
    },
  });

  return response;
}

export async function RegisterRepo(params: IRegisterParams) {
  try {
    const emailCheck = await findUserByEmail(params.email);
    if (emailCheck) throw new AppError(409, "email already registered");

    const salt = genSaltSync(15);
    const hashed = hashSync(params.password, salt);

    const hbsPath = path.join(
      __dirname,
      "../handlebars-templates/Registration.template.hbs"
    );
    const readHbs = fs.readFileSync(hbsPath, "utf-8");
    const compileHbs = Handlebars.compile(readHbs);
    const html = compileHbs({
      name: `${params.firstname} ${params.lastname}`,
    });

    const response = await prisma.$transaction(async (tx) => {
      const threeMonthsLater = new Date();
      threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

      let reffOwner = null;
      if (params.referral_code) {
        reffOwner = await tx.user.findFirst({
          select: {
            id: true,
          },
          where: {
            referral_code: params.referral_code,
          },
        });

        if (!reffOwner) {
          console.log("no refferal");
        } else {
          await tx.points.create({
            data: {
              user_id: reffOwner.id,
              expired_date: threeMonthsLater,
            },
          });
        }
      }

      let refCode;
      let refExists = true;

      while (refExists) {
        refCode = randomCodeGenerator("R");
        refExists = !!(await tx.user.findUnique({
          where: { referral_code: refCode },
        }));
      }

      const user = await tx.user.create({
        data: {
          firstname: params.firstname,
          lastname: params.lastname,
          email: params.email,
          password: hashed,
          role_id: params.role_id,
          referral_code: refCode as string,
          referrer_id: reffOwner?.id || null,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          role: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });

      if (reffOwner) {
        let couponCode;
        let couponExists = true;
        while (couponExists) {
          couponCode = randomCodeGenerator("C");
          couponExists = !!(await tx.coupon.findUnique({
            where: {
              code: couponCode,
            },
          }));
        }

        await tx.coupon.create({
          data: {
            code: couponCode as string,
            user_id: user.id,
            expired_date: threeMonthsLater,
          },
        });
      }

      return user;
    });

    if (!response) throw new AppError(500, "registration error");

    await mailer.sendMail({
      to: response.email,
      subject: "Welcome to Better Ticket",
      html: html,
    });

    const token = sign(response, SECRET_KEY as string, { expiresIn: "1h" });

    return { response, token };
  } catch (err) {
    throw err;
  }
}

export async function VerifyUserRepo(id: IVerifyUserParam) {
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

export async function LoginRepo(params: ILoginParams) {
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

export async function resetPassowordRepo(params: IResetPasswordParams) {
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

export async function ForgotPasswordReqRepo(params: IForgotPasswordReqParam) {
  try {
    const response = await findUserByEmail(params);
    if (!response) {
      throw new AppError(404, "we sent you the email");
    }

    const payload = {
      id: response.id,
      firstname: response.firstname,
      lastname: response.lastname,
      email: response.email,
      role: {
        role_id: response.role.id,
        name: response.role.name,
      },
    };

    const token = sign(payload, SECRET_KEY as string, { expiresIn: "1h" });

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          email: params,
        },
        data: {
          temp_token: token,
        },
      });
    });

    const hbsPath = path.join(
      __dirname,
      "../handlebars-templates/ForgotPasswordRequest.template.hbs"
    );
    const readHbs = fs.readFileSync(hbsPath, "utf-8");
    const compileHbs = Handlebars.compile(readHbs);
    const html = compileHbs({
      name: `${response.firstname} ${response.lastname}`,
      token: token,
      domain: `${FE_URL}/forgot_password`,
    });

    await mailer.sendMail({
      to: response.email,
      subject: "Reset Password Request",
      html: html,
    });
  } catch (err) {
    throw err;
  }
}

export async function ForgotPasswordRepo(params: IForgotPasswordParams) {
  try {
    const user = await findUserByEmail(params.email);
    if (!user) throw new AppError(404, "user not found");

    console.log("paramramramramramrm", params.token);
    console.log("usererrerer", user.temp_token);
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
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
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
