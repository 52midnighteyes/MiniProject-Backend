"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwIf = throwIf;
const AppError_utils_1 = require("../classes/AppError.utils");
function throwIf(condition, status, message) {
    if (condition)
        throw new AppError_utils_1.AppError(status, message);
}
// kita jadinya ga pake throw new error tapi pake
// throwIf(!user, 404, 'User not found')
