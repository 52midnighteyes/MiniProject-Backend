import { z } from "zod";

export const userRegisterSchema = z.object({
  firstname: z.string().trim().nonempty("firstname cannot be empty"),
  lastname: z.string().trim().nonempty("lastname cannot be empty"),
  email: z.email().trim().nonempty("email cannot be empty"),
  password: z
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
  role_id: z.string().trim().nonempty("role is required"),
  referral_code: z.string().trim(),
});

export const userLoginSchema = z.object({
  email: z.email().trim().nonempty("email cannot be empty"),
  password: z.string().trim().nonempty("password cannot be empty"),
});

export const VerifyUserSchema = z.object({
  email: z.email().trim().nonempty("email cannot be empty"),
});

export const IResetPasswordSchmea = z.object({
  new_password: z
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
  old_password: z.string().trim().nonempty("password cannot be empty"),
});

export const ForgotPasswordReqSchema = z.object({
  email: z.email().trim().nonempty("email cannot be empty"),
});

export const ForgotPasswordSchema = z.object({
  password: z
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
