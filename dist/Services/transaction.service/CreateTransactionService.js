"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateTransactionService;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const AppError_utils_1 = require("../../classes/AppError.utils");
const dataFinder_1 = require("../auth.service/utils/dataFinder");
// import { Decimal } from "@prisma/client/runtime/library"; // ga kepake
async function CreateTransactionService(params) {
    let voucher = 0;
    let points = 0;
    let coupon = 0;
    try {
        const user = await (0, dataFinder_1.findUserById)(params.user_id);
        if (!user)
            throw new AppError_utils_1.AppError(404, "User not found");
        const voucherCode = await prisma_1.default.voucher.findFirst({
            where: {
                code: params.voucher_code,
                is_available: true,
                expired_date: { gte: new Date() },
            },
        });
        if (voucherCode) {
            voucher = voucherCode.discount_amount;
        }
        // === HANYA CEK POINTS JIKA ADA points_id ===
        const checkPoints = params.points_id
            ? await prisma_1.default.points.findFirst({
                where: {
                    id: params.points_id,
                    is_used: false,
                    expired_date: { gte: new Date() },
                },
            })
            : null;
        if (checkPoints) {
            points = checkPoints.points_amount;
        }
        const couponCode = await prisma_1.default.coupon.findFirst({
            where: {
                code: params.coupon_code,
                is_used: false,
                expired_date: { gte: new Date() },
            },
        });
        if (couponCode) {
            // asumsi: discount_amount disimpan sebagai persentase (0.1 = 10%)
            coupon = couponCode.discount_amount.toNumber();
        }
        const event = await prisma_1.default.event.findFirst({
            where: { id: params.event_id },
            include: {
                ticketTypes: {
                    where: { id: params.ticket_type_id },
                },
            },
        });
        if (!event || event.ticketTypes.length === 0) {
            throw new AppError_utils_1.AppError(404, "Event or ticket type are incorrect");
        }
        const response = await prisma_1.default.$transaction(async (tx) => {
            let payAmount = event.ticketTypes[0].price;
            // apply potongan
            payAmount -= points;
            payAmount -= voucher;
            payAmount -= payAmount * coupon;
            if (event.is_free || payAmount < 0)
                payAmount = 0;
            const transaction = await tx.transaction.create({
                data: {
                    user_id: user.id,
                    event_id: event.id,
                    ticket_type_id: event.ticketTypes[0].id,
                    coupon_id: couponCode?.id || null,
                    voucher_id: voucherCode?.id || null,
                    total_price: payAmount,
                    expired_at: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 jam
                },
            });
            if (voucherCode) {
                const updatedVoucher = await tx.voucher.update({
                    where: { code: voucherCode.code },
                    data: {
                        quota: { decrement: 1 },
                    },
                });
                // updatedVoucher.quota sudah NILAI TERBARU setelah decrement
                if (updatedVoucher.quota < 1) {
                    await tx.voucher.update({
                        where: { id: updatedVoucher.id },
                        data: { is_available: false },
                    });
                }
            }
            // === HANYA UPDATE POINTS JIKA ADA points_id & record valid ===
            if (params.points_id && checkPoints) {
                await tx.points.update({
                    where: { id: checkPoints.id },
                    data: { is_used: true },
                });
            }
            if (couponCode) {
                await tx.coupon.update({
                    where: { id: couponCode.id },
                    data: { is_used: true },
                });
            }
            return transaction;
        });
        return response;
    }
    catch (err) {
        throw err;
    }
}
