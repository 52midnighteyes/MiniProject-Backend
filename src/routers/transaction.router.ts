import { Router } from "express";

import {
  CreateTransactionController,
  GetEORevenueStatisticByDateController,
  GetEventRevenueByDateController,
  GetTransactionByEventIdController,
  GetTransactionByUserIdController,
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

const router = Router();

router.use(verifyToken);

router.get(
  "/user",
  validate(GetTransactionByUserIdSchema),
  AdminGuard(["user"]),
  GetTransactionByUserIdController
);
router.use(AdminGuard(["admin", "event_organizer"]));

router.post(
  "/",
  validate(CreateTransactionSchema),
  CreateTransactionController
);

router.get(
  "/dashboard",
  validate(GetEventRevenueByDateSchema),
  GetEventRevenueByDateController
);
router.get(
  "/revenue/organizer",
  validate(GetEORevenueByDateServiceSchema),
  GetEORevenueStatisticByDateController
);
router.get(
  "/revenue/event",
  validate(GetEventRevenueByDateSchema),
  GetEventRevenueByDateController
);
router.get(
  "/organizer",
  validate(GetTransactionByEventIdSchema),
  GetTransactionByEventIdController
);

export default router;
