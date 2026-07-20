import orderModel from "../model/order.model.js";

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
        .populate("user", "username email")
        .populate("items.product", "name price images")
        .sort({ _id: -1 });
      return res
        .status(200)
        .json({ success: true, message: "Orders fetched successfully", orders });
    }
    const orders = await orderModel
      .find({ user: user.id })
      .populate("seller", "username email")
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
    const user = req.user;
    const { orderId } = req.params;
    const { status } = req.body;

    if (user.role !== "seller") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const order = await orderModel.findOneAndUpdate(
      { _id: orderId, seller: user.id },
      { $set: { status } },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found or unauthorized" });
    }

    return res.status(200).json({ success: true, message: "Order status updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
