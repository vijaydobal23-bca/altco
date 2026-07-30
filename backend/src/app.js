import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "../public");

const app = express();
app.use(morgan("dev"));

// ─── Core Middleware ──────────────────────────────────────────────────────────
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// ─── Serve Frontend Static Files ─────────────────────────────────────────────
app.use(express.static(publicDir));

// ─── Health Check (API only) ──────────────────────────────────────────────────
app.get("/api", (req, res) => {
  res.json({ success: true, message: "ECOM API is running 🚀" });
});

// ─── SPA Fallback — serve index.html for all non-API routes ──────────────────
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
