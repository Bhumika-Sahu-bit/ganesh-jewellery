import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Product from "../../models/Product.js";
import Address from "../../models/Address.js";
import Order from "../../models/Order.js";
import BuyNow from "../../models/BuyNow.js";
import AdminNotification from "../../models/AdminNotification.js";
import authMiddleware from "../../middleware/auth.js";
import sendAdminEmail from "../../utils/sendAdminEmail.js";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* =========================
  CREATE ONLINE PAYMENT ORDER
========================= */
router.post("/online-payment", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const options = {
      amount: product.finalPrice * 100, // ₹ → paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
    res.status(500).json({ message: "Failed to create payment order" });
  }
});

/* =========================
   VERIFY PAYMENT
========================= */
router.post("/verify-payment", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      productId,
      addressId,
    } = req.body;

    // 1️⃣ Validate
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({ message: "Payment data missing" });
    }

    // 2️⃣ Signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // 3️⃣ Fetch product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 4️⃣ Fetch address
    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // 5️⃣ Create order
    const order = await Order.create({
      userId: req.user._id,
      items: [
        {
          productId: product._id,
          name: product.name,
          image: product.images?.[0]?.url,
          quantity: 1,
          price: product.finalPrice,
        },
      ],
      address: {
        name: address.name,
        phoneNo: address.phoneNo,
        addressLine: address.addressLine,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      },
      totalAmount: product.finalPrice,
      paymentMethod: "ONLINE",
      paymentStatus: "Paid",
      orderStatus: "Placed",
      paymentId: razorpay_payment_id,
      
    });

    // // Send admin email notification
    // await AdminNotification.create({
    //   title: "New Order Placed",
    //   messaage: `₹${order.totalAmount} order placed`,
    //   orderId: order._id,
    // })

    // // Send email to admin
    // await sendAdminEmail(order);

    // 6️⃣ Reduce stock
    product.stock -= 1;
    await product.save();

    // 7️⃣ Clear BuyNow
    await BuyNow.deleteOne({ userId });

    res.status(200).json({
      success: true,
      message: "Payment successful & order placed",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
