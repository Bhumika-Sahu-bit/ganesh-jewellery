import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../controllers/user/wishlistController.js";
import authMiddleware from "../../middleware/auth.js"; // JWT auth

const router = express.Router();

router.post("/add", authMiddleware, addToWishlist);
router.get("/", authMiddleware, getWishlist);
router.delete("/remove/:productId", authMiddleware, removeFromWishlist);

export default router;
