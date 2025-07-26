import { AppError } from "../classes/AppError.utils";
import { IRegisterParam, IVerifyUserParam } from "../interfaces/auth.interface";
import { findUserByEmail } from "../utils/dataFinder";
import prisma from "../lib/prisma";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { randomCodeGenerator } from "../utils/randomCode";

import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

import { genSaltSync, hashSync } from "bcrypt";
import mailer from "../lib/nodemailer";

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

export async function RegisterRepo(params: IRegisterParam) {
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

      const refCode = randomCodeGenerator("R");
      const user = await tx.user.create({
        data: {
          firstname: params.firstname,
          lastname: params.lastname,
          email: params.email,
          password: hashed,
          role_id: params.role_id,
          referral_code: refCode,
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
        const couponCode = randomCodeGenerator("C");
        await tx.coupon.create({
          data: {
            code: couponCode,
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
