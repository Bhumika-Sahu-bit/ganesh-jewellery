import express from "express";
import { checkoutBuyNow } from "../../controllers/user/checkoutController.js";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

router.post("/buy-now", authMiddleware, checkoutBuyNow);

export default router;
