import Order from "../../models/Order.js";

// ===============================
// GET MY ORDERS (USER)
// ===============================
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("items.productId", "name images finalPrice")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get My Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// ===============================
// GET SINGLE ORDER DETAIL
// ===============================

import mongoose from "mongoose";

export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 SAFETY CHECK
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(id)
      .populate("items.productId", "name images finalPrice description")
      .populate("userId", "name email phone");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Get Single Order Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ===============================
// cancel ORDER (USER)
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if(!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if(["Shipped", "Delivered"].includes(order.orderStatus)) {
      return res.status(400).json({ message: "Cannot cancel order at this stage" });
    }

    order.orderStatus = "Cancelled";

    //Refund if online payment
    if(order.paymentMethod === "ONLINE" && order.paymentStatus === "Paid") {
      order.refundStatus = "Initiated"; // means refund process started
      order.paymentStatus = "Refunded"; // mark payment as refunded
    }

    await order.save();

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Cancel Order Error:", error);
    res.status(500).json({ message: "Server error" });
  }

};

// ===============================
// return ORDER (USER)
export const returnOrder = async(req , res) => {
  try {
      const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.orderStatus !== "Delivered")
      return res.status(400).json({ message: "Only delivered orders can be returned" });


    //check return window (10 days)
    const deliveredAt = order.deliveredAt;
    const now = new Date();
    const diffDays = Math.floor((now - deliveredAt) / (1000 * 60 * 60 * 24));

    if(diffDays > 10) {
      return res.status(400).json({ message: "Return window has expired" });
    }

    order.orderStatus = "Returned";
    if(order.paymentMethod === "ONLINE" && order.paymentStatus === "Paid") {
      order.refundStatus = "Initiated"; // start refund process
      order.paymentStatus = "Refunded"; // mark payment as refunded
    }

    await order.save();
    res.status(200).json({ message: "Order return initiated successfully" });
  } catch (error) {
    console.error("Return Order Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}