"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = RegisterController;
exports.LoginUserController = LoginUserController;
exports.VerifyUserController = VerifyUserController;
exports.resetPassowordController = resetPassowordController;
exports.ForgotPasswordReqController = ForgotPasswordReqController;
exports.ForgotPasswordController = ForgotPasswordController;
const AppError_utils_1 = require("../classes/AppError.utils");
const RegisterService_1 = __importDefault(require("../Services/auth.service/RegisterService"));
const LoginService_1 = __importDefault(require("../Services/auth.service/LoginService"));
const VerifyUser_1 = __importDefault(require("../Services/auth.service/VerifyUser"));
const ResetPasswordService_1 = __importDefault(require("../Services/auth.service/ResetPasswordService"));
const RequestForgotPasswordService_1 = __importDefault(require("../Services/auth.service/RequestForgotPasswordService"));
const ForgotPasswordService_1 = __importDefault(require("../Services/auth.service/ForgotPasswordService"));
async function RegisterController(req, res, next) {
    try {
        console.log({ ...req.body });
        console.log("hihihi");
        const response = await (0, RegisterService_1.default)({ ...req.body });
        res.status(201).json({
            message: "registration success",
            data: response,
        });
    }
    catch (err) {
        if (err instanceof AppError_utils_1.AppError)
            return next(err);
        console.error("Unexpected Register Error:", err);
        next(new AppError_utils_1.AppError(500, "Internal Server Error"));
    }
}
async function LoginUserController(req, res, next) {
    try {
        const response = await (0, LoginService_1.default)({ ...req.body });
        res.status(210).json({
            message: "ok",
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
}
async function VerifyUserController(req, res, next) {
    try {
        const id = req.body.id;
        const response = await (0, VerifyUser_1.default)(id);
        console.log("sukses");
        res.status(201).json({
            messsage: "successfull",
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
}
async function resetPassowordController(req, res, next) {
    try {
        const { email } = req.user;
        await (0, ResetPasswordService_1.default)({ ...req.body, email });
        res.status(201).json({
            message: "password has changed",
        });
    }
    catch (err) {
        next(err);
    }
}
async function ForgotPasswordReqController(req, res, next) {
    try {
        const email = req.body.email;
        await (0, RequestForgotPasswordService_1.default)(email);
        res.status(201).json({
            message: "email sent",
        });
    }
    catch (err) {
        next(err);
    }
}
async function ForgotPasswordController(req, res, next) {
    try {
        const { email } = req.user;
        const token = req.header("Authorization")?.replace("Bearer ", "").trim();
        if (!token)
            throw new AppError_utils_1.AppError(401, "Unauthorized: Invalid or expired token");
        const response = await (0, ForgotPasswordService_1.default)({ ...req.body, email, token });
        res.status(201).json({
            message: "ok",
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
}
