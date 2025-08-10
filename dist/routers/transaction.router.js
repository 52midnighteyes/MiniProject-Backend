"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("../controllers/transaction.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const transaction_schema_1 = require("../schemas/transaction.schema");
const queryvalidator_middleware_1 = __importDefault(require("../middlewares/queryvalidator.middleware"));
const uploader_middleware_1 = __importDefault(require("../middlewares/uploader.middleware"));
uploader_middleware_1.default;
const router = (0, express_1.Router)();
router.use(auth_middleware_1.verifyToken);
router.get("/user", (0, validator_middleware_1.default)(transaction_schema_1.GetTransactionByUserIdSchema), (0, auth_middleware_1.AdminGuard)(["user"]), transaction_controller_1.GetTransactionByUserIdController);
router.post("/", (0, validator_middleware_1.default)(transaction_schema_1.CreateTransactionSchema), transaction_controller_1.CreateTransactionController);
router.post("/payment", (0, uploader_middleware_1.default)().single("payment_proof"), transaction_controller_1.CreatePaymentController);
router.use((0, auth_middleware_1.AdminGuard)(["ADMIN", "EVENT_ORGANIZER"]));
router.post("/", transaction_controller_1.UpdateTransactionController);
// router.get(
//   "/dashboard",
//   validateQuery(GetEventRevenueByDateSchema),
//   GetEventRevenueByDateController
// );
router.get("/revenue/organizer", (0, queryvalidator_middleware_1.default)(transaction_schema_1.GetEORevenueByDateServiceSchema), transaction_controller_1.GetEORevenueStatisticByDateController);
// router.get(
//   "/revenue/event",
//   validateQuery(GetEventRevenueByDateSchema),
//   GetEventRevenueByDateController
// );
router.get("/organizer", (0, queryvalidator_middleware_1.default)(transaction_schema_1.GetTransactionByEventIdSchema), transaction_controller_1.GetTransactionByEventIdController);
router.patch("/payment/confirmation", transaction_controller_1.ConfirmPaymentController);
exports.default = router;
