import { Router } from "express";
import {
  RegisterController,
  VerifyUserController,
} from "../controllers/auth.controller";
import { userRegisterSchema } from "../schemas/auth.schema";
import validate from "../middlewares/validator.middleware";

const router = Router();

router.post("/register", validate(userRegisterSchema), RegisterController);
router.patch("/", VerifyUserController);

export default router;
