import express from "express";
import upload from "../../middleware/upload.js";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../../controllers/admin/productController.js";

const router = express.Router();

router.post(
  "/product",
  upload.array("images", 8),
  addProduct
);

router.get("/product", getProducts);

router.put(
  "/product/:id",
  upload.array("images", 8),
  updateProduct
);

router.delete("/product/:id", deleteProduct);

export default router;
