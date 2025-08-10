"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentSchema = exports.GetEORevenueByDateServiceSchema = exports.GetEventRevenueByDateSchema = exports.GetTransactionByUserIdSchema = exports.GetTransactionByEventIdSchema = exports.GetEventTransactionSchema = exports.CreateTransactionSchema = void 0;
const zod_1 = require("zod");
exports.CreateTransactionSchema = zod_1.z.object({
    event_id: zod_1.z.string().nonempty("Event ID is required"),
    ticket_type_id: zod_1.z.string().nonempty("Ticket Type is required"),
    coupon_code: zod_1.z.string().optional().nullable(),
    points_id: zod_1.z.string().optional().nullable(),
    voucher_code: zod_1.z.string().optional().nullable(),
});
exports.GetEventTransactionSchema = zod_1.z.object({
    event_id: zod_1.z.string(),
});
exports.GetTransactionByEventIdSchema = zod_1.z.object({
    event_id: zod_1.z.string(),
    days: zod_1.z.number().int().positive(),
});
exports.GetTransactionByUserIdSchema = zod_1.z.object({
    user_id: zod_1.z.uuid(),
});
exports.GetEventRevenueByDateSchema = zod_1.z.object({
    event_id: zod_1.z.uuid(),
    days: zod_1.z.number().int().positive(),
});
exports.GetEORevenueByDateServiceSchema = zod_1.z.object({
    organizer_id: zod_1.z.uuid(),
    days: zod_1.z.number().int().positive(),
});
exports.CreatePaymentSchema = zod_1.z.object({});
