"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetTransactionDetailsService;
const AppError_utils_1 = require("../../classes/AppError.utils");
const prisma_1 = __importDefault(require("../../lib/prisma"));
async function GetTransactionDetailsService(params) {
    try {
        const transaction = await prisma_1.default.transaction.findFirst({
            where: {
                id: params.transaction_id,
                user_id: params.user_id,
            },
        });
        if (!transaction)
            throw new AppError_utils_1.AppError(404, "transaction not found");
    }
    catch (err) {
        throw err;
    }
}
