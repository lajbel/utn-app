import { Router } from "express";
import { getUser, updateUser } from "../controllers/users.controller.ts";
import { verifyAuth } from "../middlewares/verifyAuth.ts";

const router = Router();

router.get("/users/:id", getUser);
router.put("/users/:id", verifyAuth, updateUser);

export default router;
