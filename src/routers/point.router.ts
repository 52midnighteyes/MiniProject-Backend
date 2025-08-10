import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { GetPointsByIdController } from "../controllers/points.controller";

const router = Router();

router.use(verifyToken);
router.get("/", GetPointsByIdController);

export default router;
