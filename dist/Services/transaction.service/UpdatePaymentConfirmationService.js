"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreatePaymentConfirmationService;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const randomCode_1 = require("../../utils/randomCode");
const AppError_utils_1 = require("../../classes/AppError.utils");
async function CreatePaymentConfirmationService(params) {
    let notes = "";
    if (params.notes)
        notes = params.notes;
    try {
        const transaction = await prisma_1.default.transaction.findFirst({
            where: { id: params.transaction_id },
            include: {
                event: {
                    select: {
                        name: true,
                        organizer_id: true,
                    },
                },
            },
        });
        if (!transaction)
            throw new AppError_utils_1.AppError(404, "event not found");
        if (params.organizer_id !== transaction.event.organizer_id)
            throw new AppError_utils_1.AppError(403, "unauthorized");
        const ticket = await prisma_1.default.ticketType.findFirst({
            where: {
                id: transaction.ticket_type_id,
            },
        });
        if (!ticket)
            throw new AppError_utils_1.AppError(404, "invalid ticket id");
        if (ticket.is_soldout) {
            prisma_1.default.transaction.update({
                where: {
                    id: params.transaction_id,
                },
                data: {
                    status: "CANCELED",
                    admin_notes: "Already Sold Out",
                },
            });
            throw new AppError_utils_1.AppError(404, "no seat found");
        }
        const response = await prisma_1.default.$transaction(async (tx) => {
            const txs = await tx.transaction.update({
                where: {
                    id: params.transaction_id,
                },
                data: {
                    status: params.status,
                    admin_notes: notes,
                    ticket_code: (0, randomCode_1.randomCodeGenerator)(`TX${transaction.event.name.slice(4, 7)}`),
                },
            });
            const checkTicket = await tx.ticketType.findFirst({
                where: {
                    id: transaction.ticket_type_id,
                },
            });
        });
        if (ticket)
            return transaction;
    }
    catch (err) {
        throw err;
    }
}
