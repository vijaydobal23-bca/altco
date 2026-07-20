import { Router } from "express";
import { addToCart, getMyCart, removeFromCart, updateCartQty, clearCart } from "../controller/cart.controller.js";
import { identifyUser } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/add", identifyUser, addToCart);
router.get("/", identifyUser, getMyCart);
router.delete("/remove/:productId", identifyUser, removeFromCart);
router.put("/update/:productId", identifyUser, updateCartQty);
router.delete("/clear", identifyUser, clearCart);

export default router;