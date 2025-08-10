"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const event_schema_1 = require("../schemas/event.schema");
const event_controller_2 = require("../controllers/event.controller");
const queryvalidator_middleware_1 = __importDefault(require("../middlewares/queryvalidator.middleware"));
const router = (0, express_1.Router)();
router.use(auth_middleware_1.verifyToken);
router.post("/", event_controller_1.CreateEventController);
router.get("/", (0, auth_middleware_1.AdminGuard)(["EVENT_ORGANIZER", "ADMIN"]), (0, validator_middleware_1.default)(event_schema_1.GetEventAttendersByDateSchema), event_controller_1.GetEventAttendersByDateController);
router.get("/details", (0, queryvalidator_middleware_1.default)(event_schema_1.GetEventDetailsByIdSchema), event_controller_2.GetEventDetailsByIdController);
router.patch("/attender", event_controller_1.ConfirmEventAttendersController);
exports.default = router;
