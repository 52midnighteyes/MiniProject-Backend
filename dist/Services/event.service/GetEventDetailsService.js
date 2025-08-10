"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEventDetailsByIdService = GetEventDetailsByIdService;
const AppError_utils_1 = require("../../classes/AppError.utils");
const prisma_1 = __importDefault(require("../../lib/prisma"));
async function GetEventDetailsByIdService(params) {
    try {
        const response = await prisma_1.default.event.findUnique({
            where: {
                id: params.event_id,
            },
            include: {
                eventCategories: true,
                ticketTypes: true,
            },
        });
        if (!response)
            throw new AppError_utils_1.AppError(404, "data not found");
        return response;
    }
    catch (err) {
        throw err;
    }
}
