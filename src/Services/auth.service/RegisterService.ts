import prisma from "../../lib/prisma";
import { IRegisterParams } from "../../interfaces/auth.interface";
import { genSaltSync, hashSync } from "bcrypt";
import { AppError } from "../../classes/AppError.utils";
import { findUserByEmail } from "./utils/dataFinder";
import path from "path";
import fs from "fs";
import { randomCodeGenerator } from "../../utils/randomCode";
import mailer from "../../lib/nodemailer";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../../config";
import Handlebars from "handlebars";
import { IUserParams } from "../../user";

export default async function RegisterService(params: IRegisterParams) {
  try {
    const emailCheck = await findUserByEmail(params.email);
    if (emailCheck) throw new AppError(409, "email already registered");

    const salt = genSaltSync(15);
    const hashed = hashSync(params.password, salt);

    const hbsPath = path.join(
      __dirname,
      "../../handlebars-templates/Registration.template.hbs"
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
          avatar: true,
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

    const payload: IUserParams = {
      id: response.id,
      email: response.email,
      firstname: response.firstname,
      lastname: response.lastname,
      avatar: response.avatar,
      role: response.role,
    };

    const token = sign(response as IUserParams, SECRET_KEY as string, {
      expiresIn: "1h",
    });

    return { response, token };
  } catch (err) {
    throw err;
  }
}
