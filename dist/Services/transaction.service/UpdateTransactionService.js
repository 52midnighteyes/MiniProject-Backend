"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UpdateTransaction;
const AppError_utils_1 = require("../../classes/AppError.utils");
const prisma_1 = __importDefault(require("../../lib/prisma"));
async function UpdateTransaction(params) {
    try {
        const response = await prisma_1.default.transaction.update({
            where: {
                id: params.id,
            },
            data: {
                status: params.status,
            },
        });
        if (!response)
            throw new AppError_utils_1.AppError(404, "Data not found");
        return response;
    }
    catch (err) {
        throw err;
    }
}
