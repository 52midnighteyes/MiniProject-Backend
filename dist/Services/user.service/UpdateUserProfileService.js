"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UpdateUserProfileService;
const AppError_utils_1 = require("../../classes/AppError.utils");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const dataFinder_1 = require("../auth.service/utils/dataFinder");
async function UpdateUserProfileService(params) {
    try {
        const user = await (0, dataFinder_1.findUserById)(params.id);
        if (!user)
            throw new AppError_utils_1.AppError(404, "no user found");
        const response = await prisma_1.default.$transaction(async (tx) => {
            const updateData = tx.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    ...params,
                },
            });
            return updateData;
        });
        return response;
    }
    catch (err) {
        throw err;
    }
}
