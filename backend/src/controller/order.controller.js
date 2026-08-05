import orderModel from "../model/order.model.js";
import productModel from "../model/product.model.js";
import { createOrderNotification } from "../services/notification.sevice.js";

export const createOrder = async (req, res) => {
  try {
    const user = req.user;
    const {
      sellerId,
      totalAmount,
      address,
      phone,
      items,
      paymentMethod,
      paymentStatus,
    } = req.body;

    if (!sellerId || !totalAmount || !address || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const order = await orderModel.create({
      seller: sellerId,
      user: user.id,
      totalAmount,
      destinationAddress: address,
      phone: String(phone),
      items: items,
      paymentMethod,
      paymentStatus,
    });

    // ── In-app notification: order placed ──────────────────────────────────
    await createOrderNotification(
      user.id,
      "ORDER_PLACED",
      "Order Placed Successfully! 🎉",
      `Your order #${order._id} has been placed. Total: ₹${totalAmount}. Payment: ${paymentMethod}. We'll deliver to ${address} within 7–10 business days.`,
      order._id
    );

    return res
      .status(200)
      .json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const user = req.user;
    if (user.role === "seller") {
      const orders = await orderModel
        .find({ seller: user.id })
        .populate("user", "name email")
        .populate("items.product", "name price images")
        .sort({ _id: -1 });
      return res
        .status(200)
        .json({ success: true, message: "Orders fetched successfully", orders });
    }
    const orders = await orderModel
      .find({ user: user.id })
      .populate("seller", "name email")
      .populate("items.product", "name price images")
      .sort({ _id: -1 });
    return res
      .status(200)
      .json({ success: true, message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const seller = req.user;
    const { orderId } = req.params;
    const { status } = req.body;

    if (seller.role !== "seller") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const order = await orderModel
      .findOne({ _id: orderId, seller: seller.id })
      .populate("user", "name email")
      .populate("items.product", "name price images");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found or unauthorized" });
    }

    const itemNames = order.items
      .map((item) => item.product?.name)
      .filter(Boolean)
      .join(", ");

    // ── SHIPPED notification ───────────────────────────────────────────────
    if (status === "SHIPPED" && order.status !== "SHIPPED") {
      await createOrderNotification(
        order.user._id,
        "ORDER_SHIPPED",
        "Your Order Has Been Shipped! 🚚",
        `Great news! Your order #${order._id} containing "${itemNames}" is on its way. Total: ₹${order.totalAmount}. Expected delivery in 2–3 business days to ${order.destinationAddress}.`,
        order._id
      );
    }

    // ── DELIVERED notification ─────────────────────────────────────────────
    if (status === "DELIVERED" && order.status !== "DELIVERED") {
      for (const item of order.items) {
        await productModel.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }

      await createOrderNotification(
        order.user._id,
        "ORDER_DELIVERED",
        "Order Delivered Successfully! ✅",
        `Your order #${order._id} containing "${itemNames}" has been delivered. Total paid: ₹${order.totalAmount}. Thank you for shopping with ALT!`,
        order._id
      );
    }

    // ── CANCELLED notification ─────────────────────────────────────────────
    if (status === "CANCELLED" && order.status !== "CANCELLED") {
      await createOrderNotification(
        order.user._id,
        "ORDER_CANCELLED",
        "Order Cancelled",
        `Your order #${order._id} has been cancelled. If you paid online, a refund will be processed within 5–7 business days.`,
        order._id
      );
    }

    order.status = status;
    await order.save();

    return res
      .status(200)
      .json({ success: true, message: "Order status updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
