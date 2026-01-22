import express from "express";
import {
  getProductsByCategory,
  getProductsBySubCategory,
  getProductById,
  getAllProducts,
} from "../../controllers/user/productController.js";
import { searchProducts } from "../../controllers/user/SearchController.js";

const router = express.Router();

// Get all products in a category
router.get("/category/:categoryId", getProductsByCategory);

// Get all products in a sub-category
router.get("/sub-category/:subCategoryId", getProductsBySubCategory);

// Get single product details
router.get("/:productId", getProductById);

// Search products
router.get("/search/:query", searchProducts);

// Get all products
router.get("/", getAllProducts);

export default router;
