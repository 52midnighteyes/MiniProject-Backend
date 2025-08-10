"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginService;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const AppError_utils_1 = require("../../classes/AppError.utils");
const dataFinder_1 = require("./utils/dataFinder");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../config");
const bcrypt_1 = require("bcrypt");
async function LoginService(params) {
    try {
        const user = await (0, dataFinder_1.findUserByEmail)(params.email);
        if (!user)
            throw new AppError_utils_1.AppError(404, "Email or Password is invalid");
        if (user.is_suspended) {
            throw new AppError_utils_1.AppError(403, "Your account is temporarily disabled, please check your email");
        }
        const isPasswordMatch = (0, bcrypt_1.compareSync)(params.password, user.password);
        if (!isPasswordMatch) {
            const failedCounter = await prisma_1.default.user.update({
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
                await prisma_1.default.user.update({
                    where: { id: user.id },
                    data: {
                        login_time_out: new Date(Date.now() + 15 * 60 * 1000),
                    },
                });
                throw new AppError_utils_1.AppError(403, "Too many failed attempts. Try again 15 minutes later.");
            }
            throw new AppError_utils_1.AppError(404, "Email or Password is invalid");
        }
        await prisma_1.default.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: user.id },
                data: {
                    login_attempt: 0,
                },
            });
        });
        const response = {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            avatar: user.avatar,
            role: user.role,
        };
        const token = (0, jsonwebtoken_1.sign)(response, config_1.SECRET_KEY, {
            expiresIn: "2h",
        });
        return { response, token };
    }
    catch (err) {
        throw err;
    }
}
