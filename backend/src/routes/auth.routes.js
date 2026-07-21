import express from "express";
import {
  register,
  login,
  getMe,
  logout,
  verifyUser
} from "../controller/authController.js";
import { identifyUser } from "../middleware/authMiddleware.js";
import { validateRegister, validateLogin } from "../validation/auth.validator.js";

const router = express.Router();

// Public routes
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/verify-email", verifyUser);

// Protected routes (requires valid JWT)
router.get("/getme", identifyUser, getMe);
router.post("/logout", identifyUser, logout);

export default router;
