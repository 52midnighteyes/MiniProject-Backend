import { Router } from "express";

import {
  ConfirmPaymentController,
  CreatePaymentController,
  CreateTransactionController,
  GetEORevenueStatisticByDateController,
  GetTransactionByEventIdController,
  GetTransactionByUserIdController,
  UpdateTransactionController,
} from "../controllers/transaction.controller";
import { AdminGuard, verifyToken } from "../middlewares/auth.middleware";
import validate from "../middlewares/validator.middleware";
import {
  CreateTransactionSchema,
  GetEORevenueByDateServiceSchema,
  GetEventRevenueByDateSchema,
  GetTransactionByEventIdSchema,
  GetTransactionByUserIdSchema,
} from "../schemas/transaction.schema";
import validateQuery from "../middlewares/queryvalidator.middleware";
import uploader from "../middlewares/uploader.middleware";
uploader;

const router = Router();

router.use(verifyToken);

router.get(
  "/user",
  validate(GetTransactionByUserIdSchema),
  AdminGuard(["user"]),
  GetTransactionByUserIdController
);

router.post(
  "/",
  validate(CreateTransactionSchema),
  CreateTransactionController
);

router.post(
  "/payment",
  uploader().single("payment_proof"),
  CreatePaymentController
);

router.use(AdminGuard(["ADMIN", "EVENT_ORGANIZER"]));

router.post("/", UpdateTransactionController);

// router.get(
//   "/dashboard",
//   validateQuery(GetEventRevenueByDateSchema),
//   GetEventRevenueByDateController
// );
router.get(
  "/revenue/organizer",
  validateQuery(GetEORevenueByDateServiceSchema),
  GetEORevenueStatisticByDateController
);
// router.get(
//   "/revenue/event",
//   validateQuery(GetEventRevenueByDateSchema),
//   GetEventRevenueByDateController
// );
router.get(
  "/organizer",
  validateQuery(GetTransactionByEventIdSchema),
  GetTransactionByEventIdController
);

router.patch("/payment/confirmation", ConfirmPaymentController);

export default router;
