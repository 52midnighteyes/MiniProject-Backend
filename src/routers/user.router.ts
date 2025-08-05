import { Router } from "express";
import { UpdateUserAvatarController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import uploader from "../middlewares/uploader.middleware";

const router = Router();
router.use(verifyToken);

router.patch(
  "/avatar",
  uploader().single("avatar"),
  UpdateUserAvatarController
);

export default router;
