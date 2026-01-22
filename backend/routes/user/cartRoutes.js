import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../../controllers/user/cartController.js";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/add", addToCart);
router.get("/", getCart);
router.delete("/:productId", removeFromCart);
router.put("/:productId", updateCartQuantity);

export default router;
