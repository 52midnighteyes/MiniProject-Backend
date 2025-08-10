import { Router } from "express";
import {
  ConfirmEventAttendersController,
  CreateEventController,
  GetEventAttendersByDateController,
} from "../controllers/event.controller";
import { AdminGuard, verifyToken } from "../middlewares/auth.middleware";
import validate from "../middlewares/validator.middleware";
import {
  GetEventAttendersByDateSchema,
  GetEventDetailsByIdSchema,
} from "../schemas/event.schema";
import { GetEventDetailsByIdController } from "../controllers/event.controller";
import validateQuery from "../middlewares/queryvalidator.middleware";

const router = Router();

router.use(verifyToken);
router.post("/", CreateEventController);

router.get(
  "/",
  AdminGuard(["EVENT_ORGANIZER", "ADMIN"]),
  validate(GetEventAttendersByDateSchema),
  GetEventAttendersByDateController
);

router.get(
  "/details",
  validateQuery(GetEventDetailsByIdSchema),
  GetEventDetailsByIdController
);

router.patch("/attender", ConfirmEventAttendersController);
export default router;
