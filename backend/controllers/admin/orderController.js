import Order from "../../models/Order.js";

/* =========================
   GET ALL ORDERS (ADMIN)
========================= */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email phoneNo")
      .populate("items.productId", "name images")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Admin get orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


/* =========================
   UPDATE ORDER STATUS
========================= */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({ message: "Failed to update order" });
  }
};

