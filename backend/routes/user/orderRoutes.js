import express from "express";
import {
  getMyOrders,
  getSingleOrder,
  cancelOrder,
  returnOrder
} from "../../controllers/user/orderController.js";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

// user ke saare orders
router.get("/my-orders", authMiddleware, getMyOrders);

// single order detail
router.get("/:id", authMiddleware, getSingleOrder);

// cancel order
router.put("/cancel/:id", authMiddleware, cancelOrder);

// return order
router.put("/return/:id", authMiddleware, returnOrder);

export default router;
