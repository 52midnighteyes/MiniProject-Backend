"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const AppError_utils_1 = require("../classes/AppError.utils");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function errorHandler(err, req, res, next) {
    const devStatus = config_1.isDev !== "production";
    // Log error aman
    if (err instanceof Error) {
        console.error("[ERROR]", err.name, err.message);
        if (devStatus)
            console.error(err.stack);
    }
    else {
        console.error("[UNKNOWN ERROR]", err);
    }
    if (err instanceof AppError_utils_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            ...(devStatus && { name: err.name, stack: err.stack }),
        });
    }
    if (err instanceof zod_1.ZodError) {
        const z = err;
        return res.status(400).json({
            success: false,
            message: "Validation error",
        });
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({
            success: false,
            message: "Database error",
            code: err.code,
        });
    }
    if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
        return res.status(401).json({
            success: false,
            message: "Token has expired. Please login again.",
        });
    }
    if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
        return res.status(401).json({
            success: false,
            message: "Invalid token. Authentication failed.",
        });
    }
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        ...(devStatus &&
            err instanceof Error && {
            name: err.name,
            stack: err.stack,
        }),
    });
}
