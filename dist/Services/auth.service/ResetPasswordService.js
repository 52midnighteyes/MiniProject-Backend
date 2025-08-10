"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = resetPassowordService;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const AppError_utils_1 = require("../../classes/AppError.utils");
const dataFinder_1 = require("./utils/dataFinder");
const bcrypt_1 = require("bcrypt");
const bcrypt_2 = require("bcrypt");
async function resetPassowordService(params) {
    try {
        const response = await (0, dataFinder_1.findUserByEmail)(params.email);
        if (!response)
            throw new AppError_utils_1.AppError(404, "data not found");
        const isOldPasswordMatch = (0, bcrypt_1.compareSync)(params.old_password, response.password);
        if (!isOldPasswordMatch)
            throw new AppError_utils_1.AppError(400, "old password doesn't match");
        const salt = (0, bcrypt_2.genSaltSync)(10);
        const hashed = (0, bcrypt_2.hashSync)(params.new_password, salt);
        await prisma_1.default.$transaction(async (tx) => {
            await tx.user.update({
                where: {
                    email: params.email,
                },
                data: {
                    password: hashed,
                },
            });
        });
    }
    catch (err) {
        throw err;
    }
}
