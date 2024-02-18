import { Router } from "express";
import * as authController from "../controllers/auth.controller.ts";
import { validateSchema } from "../middlewares/validateSchema.ts";
import { loginSchema, registerSchema } from "../schemas/authSchemas.ts";

const router = Router();

router.post(
    "/register",
    validateSchema(registerSchema),
    authController.register,
);

router.post(
    "/login",
    validateSchema(loginSchema),
    authController.login,
);

router.post(
    "/logout",
    authController.logout,
);

router.get(
    "/verify",
    authController.verify,
);

export default router;
