import nodemailer from "nodemailer";
import { USER_EMAIL, USER_PASS } from "../config";

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER_EMAIL,
    pass: USER_PASS,
  },
});

export default mailer;
