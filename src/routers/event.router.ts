import { Router } from "express";
import { GetEventAttendersByDateController } from "../controllers/event.controller";
import { AdminGuard, verifyToken } from "../middlewares/auth.middleware";
import validate from "../middlewares/validator.middleware";
import { GetEventAttendersByDateSchema } from "../schemas/event.schema";

const router = Router();

router.use(verifyToken);
router.get(
  "/",
  AdminGuard(["event_organizer", "admin"]),
  validate(GetEventAttendersByDateSchema),
  GetEventAttendersByDateController
);

export default router;
