"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegisterService;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const bcrypt_1 = require("bcrypt");
const AppError_utils_1 = require("../../classes/AppError.utils");
const dataFinder_1 = require("./utils/dataFinder");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const randomCode_1 = require("../../utils/randomCode");
const nodemailer_1 = __importDefault(require("../../lib/nodemailer"));
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../config");
const handlebars_1 = __importDefault(require("handlebars"));
async function RegisterService(params) {
    try {
        const emailCheck = await (0, dataFinder_1.findUserByEmail)(params.email);
        if (emailCheck)
            throw new AppError_utils_1.AppError(409, "email already registered");
        const salt = (0, bcrypt_1.genSaltSync)(15);
        const hashed = (0, bcrypt_1.hashSync)(params.password, salt);
        const response = await prisma_1.default.$transaction(async (tx) => {
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
                }
                else {
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
                refCode = (0, randomCode_1.randomCodeGenerator)("R");
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
                    referral_code: refCode,
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
                    couponCode = (0, randomCode_1.randomCodeGenerator)("C");
                    couponExists = !!(await tx.coupon.findUnique({
                        where: {
                            code: couponCode,
                        },
                    }));
                }
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
        if (!response)
            throw new AppError_utils_1.AppError(500, "registration error");
        const hbsPath = path_1.default.join(__dirname, "../../handlebars-templates/Registration.template.hbs");
        const readHbs = fs_1.default.readFileSync(hbsPath, "utf-8");
        const compileHbs = handlebars_1.default.compile(readHbs);
        const html = compileHbs({
            name: `${params.firstname} ${params.lastname}`,
            verificationLink: `${config_1.FE_URL}/pages/auth/verify-user?id=${response.id}`,
        });
        await nodemailer_1.default.sendMail({
            to: response.email,
            subject: "Welcome to Better Ticket",
            html: html,
        });
        const payload = {
            id: response.id,
            email: response.email,
            firstname: response.firstname,
            lastname: response.lastname,
            avatar: response.avatar,
            role: response.role,
        };
        const token = (0, jsonwebtoken_1.sign)(response, config_1.SECRET_KEY, {
            expiresIn: "1h",
        });
        return { response, token };
    }
    catch (err) {
        throw err;
    }
}
