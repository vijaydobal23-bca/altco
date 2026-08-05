import express from "express";
import {
  register,
  login,
  getMe,
  logout,
} from "../controller/authController.js";
import { identifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes (requires valid JWT)
router.get("/getme", identifyUser, getMe);
router.post("/logout", identifyUser, logout);

export default router;
