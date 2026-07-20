import Product from "../model/product.model.js";
import Cart from "../model/cart.model.js";
import { uploadFileToImagekit } from "../services/imagekit.service.js";

// ─── POST /api/products/create ────────────────────────────────────────────────
export const createProduct = async (req, res) => {
  try {
    const seller = req.user;
    const { name, description, price, stock,category,qty } = req.body;

    if (!name || !description || !price || !stock) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Product image is required." });
    }

    const imageUrl = await uploadFileToImagekit(
      req.file.buffer,
      `${seller.id}-${Date.now()}-${req.file.originalname}`,
    );

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      images: imageUrl,
      seller: seller.id,
      category,
      qty
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "Product created successfully.",
        product,
      });
  } catch (error) {
    console.error("createProduct error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Server error. Please try again later.",
      });
  }
};

// ─── GET /api/products/seller ─────────────────────────────────────────────────
export const getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("getSellerProducts error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Server error. Please try again later.",
      });
  }
};

// ─── DELETE /api/products/:id ─────────────────────────────────────────────────
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      seller: req.user.id,
    });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    // Also remove this product from all user carts
    await Cart.updateMany(
      {},
      { $pull: { items: { product: req.params.id } } }
    );

    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    console.error("deleteProduct error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Server error. Please try again later.",
      });
  }
};

// ─── PUT /api/products/:id ────────────────────────────────────────────────────
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, qty } = req.body;
    const productId = req.params.id;

    const product = await Product.findOneAndUpdate(
      { _id: productId, seller: req.user.id },
      {
        $set: { name, description, price: Number(price), stock: Number(stock), category, qty },
      },
      { new: true, runValidators: true },
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Product updated successfully.",
        product,
      });
  } catch (error) {
    console.error("updateProduct error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Server error. Please try again later.",
      });
  }
};

export const getAllProduct = async (req, res) => {
  const products = await Product.find().populate("seller").select("-password");
  if (!products)
    return res
      .status(404)
      .json({ success: false, message: "No Products Found" });

  return res.status(200).json({ success: true, products });
};
