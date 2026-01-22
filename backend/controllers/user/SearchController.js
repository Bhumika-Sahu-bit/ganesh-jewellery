import Product from "../../models/Product.js";
import Category from "../../models/Category.js";
import SubCategory from "../../models/SubCategory.js";

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.params;

    // find category ids
    const categories = await Category.find({
      name: { $regex: query, $options: "i" }
    }).select("_id");

    const subCategories = await SubCategory.find({
      name: { $regex: query, $options: "i" }
    }).select("_id");

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $in: categories.map(c => c._id) } },
        { subCategory: { $in: subCategories.map(sc => sc._id) } }
      ]
    })
      .populate("category", "name")
      .populate("subCategory", "name");

    res.json(products);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};
