"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetPointsByIdService;
const prisma_1 = __importDefault(require("../../lib/prisma"));
async function GetPointsByIdService(params) {
    try {
        const response = await prisma_1.default.$transaction(async (tx) => {
            const points = await tx.points.findMany({
                where: {
                    user_id: params.id,
                    expired_date: {
                        gte: new Date(),
                    },
                    is_used: false,
                },
            });
            if (points.length === 0) {
                return {
                    points: [],
                    totalPoints: 0,
                };
            }
            const totalPoints = await tx.points.aggregate({
                _sum: {
                    points_amount: true,
                },
                where: {
                    user_id: params.id,
                    expired_date: {
                        gte: new Date(),
                    },
                    is_used: false,
                },
            });
            return {
                points,
                totalPoints: totalPoints._sum.points_amount || 0,
            };
        });
        return response;
    }
    catch (err) {
        throw err;
    }
}
