"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
exports.AdminGuard = AdminGuard;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const AppError_utils_1 = require("../classes/AppError.utils");
async function verifyToken(req, res, next) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "").trim();
        if (!token)
            throw new AppError_utils_1.AppError(401, "Unauthorized: No token found");
        const decoded = (0, jsonwebtoken_1.verify)(token, config_1.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        next(err);
    }
}
function AdminGuard(allowedRoles) {
    return (req, res, next) => {
        try {
            const user = req?.user;
            if (!user || !allowedRoles.includes(user.role.name)) {
                throw new AppError_utils_1.AppError(403, "Forbidden: You do not have access to this resource");
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
