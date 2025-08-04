import prisma from "../../lib/prisma";
import { AppError } from "../../classes/AppError.utils";
import { findUserByEmail } from "./utils/dataFinder";
import { sign } from "jsonwebtoken";
import { SECRET_KEY, FE_URL } from "../../config";
import { IForgotPasswordReqParam } from "../../interfaces/auth.interface";
import mailer from "../../lib/nodemailer";

import path from "path";
import fs from "fs";

export default async function RequestForgotPasswordRepo(
  params: IForgotPasswordReqParam
) {
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
