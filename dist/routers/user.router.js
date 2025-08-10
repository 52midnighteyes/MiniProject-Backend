"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const uploader_middleware_1 = __importDefault(require("../middlewares/uploader.middleware"));
const router = (0, express_1.Router)();
router.use(auth_middleware_1.verifyToken);
router.patch("/avatar", (0, uploader_middleware_1.default)().single("avatar"), user_controller_1.UpdateUserAvatarController);
exports.default = router;
