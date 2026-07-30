import orderModel from "../model/order.model.js";
import productModel from "../model/product.model.js";
import { sendEmail } from "../services/mail.service.js";

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

    await sendEmail({
      to: user.email,
      subject: "Order confirmation",
      text: "Order created successfully",
      html: `
        <div>
          <h1>Thank You so much from Ordering</h1>
          <p>Your order has been created successfully.</p>
          <p>Your order id is ${order._id}</p>
          <p>Your order items are ${items}</p>
          <p>Your order total amount is ${totalAmount}</p>
          <p>Your order payment method is ${paymentMethod}</p>
          <p>Your order payment status is ${paymentStatus}</p>
          <p>Your order destination address is ${address}</p>
          <p>Your order phone is ${phone}</p>
          <p>Your order seller is ${sellerId}</p>
          <p>Your order user is ${user.id}</p>
          <p>Your Order will be delivered within 7-10 business days</p>
        </div>
      `,
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
      return res.status(404).json({ success: false, message: "Order not found or unauthorized" });
    }

    if(status === "SHIPPED" && order.status !== "SHIPPED"){
      await sendEmail({
        to: order.user.email,
        subject: "Order shipped",
        text: "Your order has been shipped successfully",
        html: `
          <div>
            <h1>Order shipped successfully</h1>
            <p>Your order has been shipped successfully.</p>
            <p>Your order id is ${order._id}</p>
            <p>Your order items are ${order.items.map((item) => item.product?.name).join(", ")}</p>
            <p>Your order total amount is ${order.totalAmount}</p>
            <p>Your order payment method is ${order.paymentMethod}</p>
            <p>Your order payment status is ${order.paymentStatus}</p>
            <p>Your order destination address is ${order.destinationAddress}</p>
            <p>Your order phone is ${order.phone}</p>
            <p>Your order seller is ${order.seller}</p>
            <p>Your order user is ${order.user._id}</p>
          </div>  
        `,
      });
    }
    if (status === "DELIVERED" && order.status !== "DELIVERED") {
      for (const item of order.items) {
        await productModel.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity }
        });
      }

      await sendEmail({
        to: order.user.email,
        subject: "Order delivered",
        text: "Your order has been delivered successfully",
        html: `
          <div>
            <h1>Order delivered successfully</h1>
            <p>Your order has been delivered successfully.</p>
            <p>Your order id is ${order._id}</p>
            <p>Your order items are ${order.items.map((item) => item.product?.name).join(", ")}</p>
            <p>Your order total amount is ${order.totalAmount}</p>
            <p>Your order payment method is ${order.paymentMethod}</p>
            <p>Your order payment status is ${order.paymentStatus}</p>
            <p>Your order destination address is ${order.destinationAddress}</p>
            <p>Your order phone is ${order.phone}</p>
            <p>Your order seller is ${order.seller}</p>
            <p>Your order user is ${order.user._id}</p>
          </div>  
        `,
      });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({ success: true, message: "Order status updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
