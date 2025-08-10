"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionController = CreateTransactionController;
exports.GetTransactionByEventIdController = GetTransactionByEventIdController;
exports.GetTransactionByUserIdController = GetTransactionByUserIdController;
exports.GetEORevenueStatisticByDateController = GetEORevenueStatisticByDateController;
exports.UpdateTransactionController = UpdateTransactionController;
exports.CreatePaymentController = CreatePaymentController;
exports.ConfirmPaymentController = ConfirmPaymentController;
const CreateTransactionService_1 = __importDefault(require("../Services/transaction.service/CreateTransactionService"));
const GetAllEventTransactionByIdService_1 = __importDefault(require("../Services/transaction.service/GetAllEventTransactionByIdService"));
const GetAllUserTransactionByIdService_1 = __importDefault(require("../Services/transaction.service/GetAllUserTransactionByIdService"));
const GetAllOrganizerRevenueByIdService_1 = __importDefault(require("../Services/transaction.service/GetAllOrganizerRevenueByIdService"));
const UpdateTransactionService_1 = __importDefault(require("../Services/transaction.service/UpdateTransactionService"));
const UpdatePaymentProofService_1 = __importDefault(require("../Services/transaction.service/UpdatePaymentProofService"));
const UpdatePaymentConfirmationService_1 = __importDefault(require("../Services/transaction.service/UpdatePaymentConfirmationService"));
async function CreateTransactionController(req, res, next) {
    try {
        const response = await (0, CreateTransactionService_1.default)({
            ...req.body,
            user_id: req.user?.id,
        });
        res.status(201).json({
            message: "transaction created",
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
}
async function GetTransactionByEventIdController(req, res, next) {
    try {
        const response = await (0, GetAllEventTransactionByIdService_1.default)({ ...req.body });
        res.status(201).json({
            message: "ok",
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
}
async function GetTransactionByUserIdController(req, res, next) {
    try {
        const response = await (0, GetAllUserTransactionByIdService_1.default)({ ...req.body });
        res.status(201).json({
            message: "ok",
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
}
async function GetEORevenueStatisticByDateController(req, res, next) {
    try {
        const response = await (0, GetAllOrganizerRevenueByIdService_1.default)({
            ...req.body,
        });
        res.status(201).json({
            message: "ok",
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
}
async function UpdateTransactionController(req, res, next) {
    try {
        const { id, status } = req.body;
        const updated = await (0, UpdateTransactionService_1.default)({
            id,
            status,
        });
        return res.status(200).json({
            message: "Transaction status updated successfully",
            data: updated,
        });
    }
    catch (err) {
        next(err);
    }
}
async function CreatePaymentController(req, res, next) {
    try {
        const user_id = req.user?.id;
        const response = await (0, UpdatePaymentProofService_1.default)({ user_id, ...req.body });
        res.status(201).json({
            message: "ok",
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
}
async function ConfirmPaymentController(req, res, next) {
    try {
        const organizer_id = req.user?.id;
        const response = await (0, UpdatePaymentConfirmationService_1.default)({ ...req.body, organizer_id });
        res.status(201).json({
            message: "ok",
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
}
