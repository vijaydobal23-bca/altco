import { Router } from "express";
import { identifyUser } from "../middleware/authMiddleware.js";
import { createOrder, getMyOrders, updateOrderStatus } from "../controller/order.controller.js";

const router = Router();

router.post("/", identifyUser, createOrder);
router.get("/", identifyUser, getMyOrders);
router.put("/:orderId/status", identifyUser, updateOrderStatus);

export default router;