import express from "express";
import upload from "../../middleware/upload.js";
import {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "../../controllers/admin/categoryController.js";

const router = express.Router();

router.post("/category", upload.single("image"), addCategory);
router.get("/category", getCategories);
router.put("/category/:id", upload.single("image"), updateCategory);
router.delete("/category/:id", deleteCategory);

export default router;
