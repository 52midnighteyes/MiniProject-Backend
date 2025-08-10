import { Router } from "express";
import {
  ForgotPasswordController,
  ForgotPasswordReqController,
  LoginUserController,
  RegisterController,
  resetPassowordController,
  VerifyUserController,
} from "../controllers/auth.controller";
import {
  ForgotPasswordReqSchema,
  ForgotPasswordSchema,
  ResetPasswordSchmea,
  userLoginSchema,
  userRegisterSchema,
} from "../schemas/auth.schema";
import validate from "../middlewares/validator.middleware";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/forgot-password",
  validate(ForgotPasswordReqSchema),
  ForgotPasswordReqController
);
router.post("/register", validate(userRegisterSchema), RegisterController);
router.post("/login", validate(userLoginSchema), LoginUserController);

router.use(verifyToken);

router.patch(
  "/forgot-password",
  validate(ForgotPasswordSchema),
  ForgotPasswordController
);
router.patch("/verify", VerifyUserController);
router.patch(
  "/reset-password",
  validate(ResetPasswordSchmea),
  resetPassowordController
);

export default router;
