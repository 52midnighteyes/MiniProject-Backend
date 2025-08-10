"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetAllEventTransactionByIdService;
const dataFinder_1 = require("./utils/dataFinder");
const AppError_utils_1 = require("../../classes/AppError.utils");
async function GetAllEventTransactionByIdService(params) {
    try {
        const response = await (0, dataFinder_1.findTransactionByEventId)(params.event_id);
        if (response.length === 0)
            throw new AppError_utils_1.AppError(404, "data not found");
        return response;
    }
    catch (err) {
        throw err;
    }
}
