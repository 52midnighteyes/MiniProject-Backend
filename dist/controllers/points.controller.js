"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPointsByIdController = GetPointsByIdController;
const GetPointsByIdService_1 = __importDefault(require("../Services/point.services/GetPointsByIdService"));
const AppError_utils_1 = require("../classes/AppError.utils");
async function GetPointsByIdController(req, res, next) {
    try {
        const id = req.user?.id;
        if (!id) {
            throw new AppError_utils_1.AppError(401, "Unauthorized");
        }
        const response = await (0, GetPointsByIdService_1.default)({ id });
        res.status(200).json({
            message: "ok",
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
}
