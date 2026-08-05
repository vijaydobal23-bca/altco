import { Router } from "express";
import { identifyUser } from "../middleware/authMiddleware.js";
import {
  getNotifications,
  readNotification,
  readAllNotifications,
} from "../controller/notification.controller.js";

const router = Router();

// All notification routes require authentication
router.use(identifyUser);

// GET  /api/notifications           — fetch all for current user
router.get("/", getNotifications);

// PUT  /api/notifications/read-all  — mark all as read (MUST be before /:id)
router.put("/read-all", readAllNotifications);

// PUT  /api/notifications/:id/read  — mark one as read
router.put("/:id/read", readNotification);

export default router;
