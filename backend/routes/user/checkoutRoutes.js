import express from "express";
import fetch from "node-fetch";
import Product from "../../models/Product.js";
import Address from "../../models/Address.js";
import Order from "../../models/Order.js";
import BuyNow from "../../models/BuyNow.js";
import authMiddleware from "../../middleware/auth.js";
import { checkoutBuyNow } from "../../controllers/user/checkoutController.js";

const router = express.Router();

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const CASHFREE_BASE_URL = "https://sandbox.cashfree.com";

/* =========================
   TEST ROUTE (DEBUG)
========================= */
router.get("/test", (req, res) => {
  res.send("✅ Checkout route working");
});

/* =========================
   CREATE ORDER (CASHFREE)
========================= */
router.post("/online-payment", authMiddleware, async (req, res) => {
  try {
    const { productId, addressId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const orderPayload = {
      order_id: `order_${Date.now()}`,
      order_amount: Number(product.finalPrice),
      order_currency: "INR",

      customer_details: {
        customer_id: req.user._id.toString(),
        customer_email: req.user.email || "test@gmail.com",
        customer_phone: req.user.phoneNo || "9999999999",
      },

      order_meta: {
  return_url: `${process.env.FRONTEND_URL}/payment-success?order_id={order_id}&productId=${productId}&addressId=${addressId}`,
},

      order_note: `Payment for ${product.name}`,
    };

    const response = await fetch(`${CASHFREE_BASE_URL}/pg/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": CASHFREE_APP_ID,
        "x-client-secret": CASHFREE_SECRET_KEY,
        "x-api-version": "2022-09-01",
        "x-request-id": `req_${Date.now()}`,
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await response.json();

    console.log("🟢 Cashfree Create Response:", data);

    if (!data.payment_session_id) {
      return res.status(500).json({
        message: "Order creation failed",
        error: data,
      });
    }

    return res.status(200).json({
      success: true,
      orderId: data.order_id,
      paymentSessionId: data.payment_session_id,
    });

  } catch (error) {
    console.error("❌ Create Order Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   VERIFY PAYMENT
========================= */
router.post("/verify-payment", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const { order_id, productId, addressId } = req.body;

    if (!order_id) {
      return res.status(400).json({ message: "Order ID missing" });
    }

    // 🔥 VERIFY FROM CASHFREE
    const response = await fetch(
      `${CASHFREE_BASE_URL}/pg/orders/${order_id}`,
      {
        method: "GET",
        headers: {
          "x-client-id": CASHFREE_APP_ID,
          "x-client-secret": CASHFREE_SECRET_KEY,
          "x-api-version": "2022-09-01",
        },
      }
    );

    const data = await response.json();

    console.log("🟡 Cashfree Verify:", data);

    if (data.order_status !== "PAID") {
      return res.status(400).json({
        message: "Payment not completed",
        status: data.order_status,
      });
    }

    // 🔥 FETCH DATA
    const product = await Product.findById(productId);
    const address = await Address.findOne({ _id: addressId, userId });

    if (!product || !address) {
      return res.status(404).json({
        message: "Product or Address not found",
      });
    }

    // 🔥 CREATE ORDER
    const order = await Order.create({
      userId,
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
      paymentId: order_id,
    });

    // 🔥 UPDATE STOCK
    product.stock -= 1;
    await product.save();

    // 🔥 CLEAR BUY NOW
    await BuyNow.deleteOne({ userId });

    return res.status(200).json({
      success: true,
      orderId: order._id,
      product,
      address,
      totalAmount: product.finalPrice,
      paymentMethod: "ONLINE",
    });

  } catch (error) {
    console.error("❌ Verify Error:", error);
    res.status(500).json({ message: "Verification failed" });
  }
});

/* =========================
   COD ORDER
========================= */
router.post("/buy-now", authMiddleware, checkoutBuyNow);

export default router;