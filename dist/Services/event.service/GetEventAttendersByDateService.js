"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetEventAttendersByDateService;
const prisma_1 = __importDefault(require("../../lib/prisma"));
async function GetEventAttendersByDateService(params) {
    try {
        const response = await prisma_1.default.transaction.aggregate({
            _count: {
                is_attending: true,
            },
            where: {
                ticketType: {
                    event_id: params.event_id,
                },
            },
        });
        if (!response) {
            return 0;
        }
        return response._count.is_attending;
    }
    catch (err) {
        throw err;
    }
}
