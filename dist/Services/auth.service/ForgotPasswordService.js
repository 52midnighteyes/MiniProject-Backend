"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ForgotPasswordService;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const AppError_utils_1 = require("../../classes/AppError.utils");
const dataFinder_1 = require("./utils/dataFinder");
const bcrypt_1 = require("bcrypt");
const bcrypt_2 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../config");
async function ForgotPasswordService(params) {
    try {
        const user = await (0, dataFinder_1.findUserByEmail)(params.email);
        if (!user)
            throw new AppError_utils_1.AppError(404, "user not found");
        console.log("ini params", params.token, "ini token db", user.temp_token);
        if (params.token !== user.temp_token) {
            throw new AppError_utils_1.AppError(404, "Unauthorized: Token does not match");
        }
        if ((0, bcrypt_1.compareSync)(params.password, user.password)) {
            throw new AppError_utils_1.AppError(400, "New Password Can not be the same as the old password");
        }
        const salt = (0, bcrypt_2.genSaltSync)(10);
        const hashed = (0, bcrypt_2.hashSync)(params.password, salt);
        const response = await prisma_1.default.$transaction(async (tx) => {
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
        if (!response)
            throw new AppError_utils_1.AppError(404, "something went wrong");
        const token = (0, jsonwebtoken_1.sign)(response, config_1.SECRET_KEY, {
            expiresIn: "1h",
        });
        return { response, token };
    }
    catch (err) {
        throw err;
    }
}
