"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetAllUserTransactionByIdService;
const dataFinder_1 = require("./utils/dataFinder");
const AppError_utils_1 = require("../../classes/AppError.utils");
async function GetAllUserTransactionByIdService(params) {
    try {
        const response = await (0, dataFinder_1.findTransactionByUserId)(params.user_id);
        if (response.length === 0)
            throw new AppError_utils_1.AppError(404, "data not found");
        return response;
    }
    catch (err) {
        throw err;
    }
}
