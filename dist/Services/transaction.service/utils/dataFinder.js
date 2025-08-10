"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTransactionByEventId = findTransactionByEventId;
exports.findTransactionByUserId = findTransactionByUserId;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
async function findTransactionByEventId(event_id) {
    const response = await prisma_1.default.transaction.findMany({
        where: {
            event_id,
        },
    });
    return response;
}
async function findTransactionByUserId(user_id) {
    const response = await prisma_1.default.transaction.findMany({
        where: {
            user_id,
        },
    });
    return response;
}
