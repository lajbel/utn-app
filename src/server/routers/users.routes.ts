import { Router } from "express";
import { getUser } from "../controllers/users.controller.ts";
import { verifyAuth } from "../middlewares/verifyAuth.ts";

const router = Router();

router.get("/users/:id", verifyAuth, getUser);

export default router;
