"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_schema_1 = require("../schemas/auth.schema");
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/forgot-password", (0, validator_middleware_1.default)(auth_schema_1.ForgotPasswordReqSchema), auth_controller_1.ForgotPasswordReqController);
router.post("/register", (0, validator_middleware_1.default)(auth_schema_1.userRegisterSchema), auth_controller_1.RegisterController);
router.post("/login", (0, validator_middleware_1.default)(auth_schema_1.userLoginSchema), auth_controller_1.LoginUserController);
router.use(auth_middleware_1.verifyToken);
router.patch("/forgot-password", (0, validator_middleware_1.default)(auth_schema_1.ForgotPasswordSchema), auth_controller_1.ForgotPasswordController);
router.patch("/verify", auth_controller_1.VerifyUserController);
router.patch("/reset-password", (0, validator_middleware_1.default)(auth_schema_1.ResetPasswordSchmea), auth_controller_1.resetPassowordController);
exports.default = router;
