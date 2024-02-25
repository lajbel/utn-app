import { Router } from "express";
import { getUser, updateUser } from "../controllers/users.controller.ts";
import { validateMongoId } from "../middlewares/validateMongoId.ts";
import { verifyAuth } from "../middlewares/verifyAuth.ts";

const router = Router();

router.get("/:id", validateMongoId, getUser);
router.put("/:id", verifyAuth, validateMongoId, updateUser);

export default router;
