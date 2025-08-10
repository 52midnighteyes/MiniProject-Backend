"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCouponByIdService = GetCouponByIdService;
const prisma_1 = __importDefault(require("../../lib/prisma"));
async function GetCouponByIdService(user_id) {
    try {
        const response = await prisma_1.default.coupon.findMany({
            where: {
                user_id,
                expired_date: {
                    gte: new Date(),
                },
                is_used: false,
            },
        });
        if (response.length === 0) {
            return { message: "user has no coupon" };
        }
        return response;
    }
    catch (err) {
        throw err;
    }
}
