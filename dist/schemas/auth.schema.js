"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordSchema = exports.ForgotPasswordReqSchema = exports.ResetPasswordSchmea = exports.VerifyUserSchema = exports.userLoginSchema = exports.userRegisterSchema = void 0;
const zod_1 = require("zod");
exports.userRegisterSchema = zod_1.z.object({
    firstname: zod_1.z.string().trim().nonempty("firstname cannot be empty"),
    lastname: zod_1.z.string().trim().nonempty("lastname cannot be empty"),
    email: zod_1.z.email().trim().nonempty("email cannot be empty"),
    password: zod_1.z
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters")
        .max(12, "Password max characters are 12")
        .regex(/^\S+$/, "Password must not contain spaces")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol")
        .nonempty("password cannot be empty"),
    role_id: zod_1.z.string().trim().nonempty("role is required"),
    referral_code: zod_1.z.string().trim(),
});
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.email().trim().nonempty("email cannot be empty"),
    password: zod_1.z.string().trim().nonempty("password cannot be empty"),
});
exports.VerifyUserSchema = zod_1.z.object({
    email: zod_1.z.email().trim().nonempty("email cannot be empty"),
});
exports.ResetPasswordSchmea = zod_1.z.object({
    new_password: zod_1.z
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters")
        .max(12, "Password max characters are 12")
        .regex(/^\S+$/, "Password must not contain spaces")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol")
        .nonempty("password cannot be empty"),
    old_password: zod_1.z.string().trim().nonempty("password cannot be empty"),
});
exports.ForgotPasswordReqSchema = zod_1.z.object({
    email: zod_1.z.email().trim().nonempty("email cannot be empty"),
});
exports.ForgotPasswordSchema = zod_1.z.object({
    password: zod_1.z
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters")
        .max(12, "Password max characters are 12")
        .regex(/^\S+$/, "Password must not contain spaces")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol")
        .nonempty("password cannot be empty"),
});
