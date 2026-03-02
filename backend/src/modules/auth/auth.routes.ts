import { Router } from "express";
import * as authController from "./auth.controller.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "./auth.validation.js";
// import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * Public Routes
 */
router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register
);

// router.post(
//   "/login",
//   validateRequest(loginSchema),
//   authController.login
// );

/**
 * Protected Routes
 */
// router.post("/logout", protect, authController.logout);

// router.get("/me", protect, authController.getMe);

// router.post("/refresh-token", authController.refreshToken);

export default router;