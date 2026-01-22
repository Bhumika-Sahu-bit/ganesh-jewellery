import express from "express";
import SubCategory from "../../models/SubCategory.js";
import upload from "../../middleware/upload.js";
import {
  addSubCategory,
  getSubCategories,
  deleteSubCategory,
  updateSubCategory,
} from "../../controllers/admin/subCategoryController.js";

const router = express.Router();

router.post(
  "/sub-category",
  upload.single("image"),
  addSubCategory
);
router.get("/sub-category", async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category", "name");
    res.json(subCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/sub-category/:categoryId", getSubCategories);

router.delete("/sub-category/:id", deleteSubCategory);
router.put("/sub-category/:id", upload.single("image"), updateSubCategory);

export default router;
