import express from "express";
import { createBuyNow } from "../../controllers/user/buyNowController.js";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createBuyNow);
export default router;
