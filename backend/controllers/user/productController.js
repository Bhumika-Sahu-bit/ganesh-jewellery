import Product from "../../models/Product.js";
// import SubCategory from "../../models/SubCategory.js";

// get sub-categories by category id
// export const getSubCategoriesByCategory = async (req, res) => {
//   try {
//     const { categoryId } = req.params;

//     const subCategories = await SubCategory.find({ category: categoryId })
//       .sort({ createdAt: -1 });

//     res.json(subCategories);
//   } catch (error) {
//     console.error("Get SubCategories Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// /* ===== Get products by category ===== */
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId })
      .populate("category", "name image")
      .populate("subCategory", "name image")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("Get Products By Category Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ===== Get products by sub-category ===== */
export const getProductsBySubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    const products = await Product.find({ subCategory: subCategoryId })
      .populate("category", "name image")
      .populate("subCategory", "name image")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("Get Products By SubCategory Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ===== Get single product details ===== */
export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId)
      .populate("category", "name image")
      .populate("subCategory", "name image");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error("Get Product By ID Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// get all products 
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name image")
      .populate("subCategory", "name image")
      .sort({ createdAt: -1 });
    res.json(products);
  }
  catch (error) {
    console.error("Get All Products Error:", error);
    res.status(500).json({ message: error.message });
  }
};
