"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConfirmEventAttendersService;
const AppError_utils_1 = require("../../classes/AppError.utils");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const dataFinder_1 = require("../auth.service/utils/dataFinder");
async function ConfirmEventAttendersService(params) {
    try {
        const organizer = await (0, dataFinder_1.findUserById)(params.organizer_id);
        if (!organizer)
            throw new AppError_utils_1.AppError(404, "no organizer found");
        const transaction = await prisma_1.default.transaction.findFirst({
            where: {
                ticket_code: params.ticket_code,
            },
            include: {
                event: true,
            },
        });
        if (!transaction)
            throw new AppError_utils_1.AppError(404, "no event found");
        if (params.organizer_id !== transaction.event.organizer_id)
            throw new AppError_utils_1.AppError(403, "unauthorized");
        const response = await prisma_1.default.transaction.update({
            where: {
                id: transaction.id,
            },
            data: {
                is_attending: true,
            },
        });
        return response;
    }
    catch (err) {
        throw err;
    }
}
