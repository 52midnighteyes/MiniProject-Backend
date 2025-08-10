"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const points_controller_1 = require("../controllers/points.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.verifyToken);
router.get("/", points_controller_1.GetPointsByIdController);
exports.default = router;
