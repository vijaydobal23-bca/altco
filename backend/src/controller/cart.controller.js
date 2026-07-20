import cartModel from "../model/cart.model.js";
import productModel from "../model/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const product = await productModel.findById(productId);
    if(!product){
      return res.status(404).json({success:false,message:"Product not found"});
    } 
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      if (quantity > product.stock) {
        return res.status(400).json({ success: false, message: "Out of stock" });
      }
      const newCart = await cartModel.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
      return res.status(201).json({ success: true, cart: newCart });
    }
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      if (existingItem.quantity + quantity > product.stock) {
        return res.status(400).json({ success: false, message: "Out of stock" });
      }
      existingItem.quantity += quantity;
    } else {
      if (quantity > product.stock) {
        return res.status(400).json({ success: false, message: "Out of stock" });
      }
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

export const getMyCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await cartModel
      .findOne({ user: userId })
      .populate("items.product", "name description price images stock seller category qty");

    if (!cart) {
      return res.status(200).json({ success: true, cart: { items: [] } });
    }
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

export const updateCartQty = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { quantity } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    if (quantity > product.stock) {
      return res.status(400).json({ success: false, message: "Out of stock" });
    }

    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    if (quantity < 1) {
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
      );
    } else {
      const item = cart.items.find((item) => item.product.toString() === productId);
      if (item) item.quantity = quantity;
    }

    await cart.save();
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await cartModel.findOneAndUpdate({ user: userId }, { $set: { items: [] } });
    return res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};