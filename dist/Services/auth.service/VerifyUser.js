"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VerifyUserService;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const AppError_utils_1 = require("../../classes/AppError.utils");
const dataFinder_1 = require("./utils/dataFinder");
async function VerifyUserService(id) {
    try {
        const checkUser = await (0, dataFinder_1.findUserById)(id);
        if (!checkUser)
            throw new AppError_utils_1.AppError(404, "user not found");
        const response = await prisma_1.default.user.update({
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
    }
    catch (err) {
        throw err;
    }
}
