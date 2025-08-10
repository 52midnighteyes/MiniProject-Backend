"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetOrganizerRevenueByDateService;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const AppError_utils_1 = require("../../classes/AppError.utils");
const dateFilter_1 = require("../../utils/dateFilter");
async function GetOrganizerRevenueByDateService(params) {
    try {
        const response = await prisma_1.default.$transaction(async (tx) => {
            const totalRevenue = await tx.transaction.aggregate({
                _sum: {
                    total_price: true,
                },
                where: {
                    event: {
                        organizer_id: params.organizer_id,
                    },
                    created_at: {
                        gte: (0, dateFilter_1.DateFilter)(params.days),
                    },
                    status: "PAID",
                },
            });
            return {
                total_revenue: totalRevenue._sum.total_price || 0,
            };
        });
        if (!response)
            throw new AppError_utils_1.AppError(404, "data not found");
        return response;
    }
    catch (err) {
        throw err;
    }
}
