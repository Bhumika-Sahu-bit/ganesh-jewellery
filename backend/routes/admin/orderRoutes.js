import express from "express";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../controllers/admin/orderController.js";

const router = express.Router();

router.get("/orders", getAllOrders);
router.put("/orders/:id", updateOrderStatus);

export default router;
