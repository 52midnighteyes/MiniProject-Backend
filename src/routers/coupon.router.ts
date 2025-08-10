import { Router } from "express";
import { GetCouponByIdController } from "../controllers/coupon.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", verifyToken, GetCouponByIdController);

export default router;
