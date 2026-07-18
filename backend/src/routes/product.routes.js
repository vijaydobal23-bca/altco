import { Router } from "express";
import { createProduct, getSellerProducts, deleteProduct, updateProduct, getAllProduct } from "../controller/product.controller.js";
import { identifySeller } from "../middleware/authMiddleware.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

// Public route — no auth needed
router.get("/all", getAllProduct);

// All routes below require seller identity
router.use(identifySeller);

router.get("/seller", getSellerProducts);
router.post("/create", upload.single("image"), createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;