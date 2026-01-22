import SubCategory from "../../models/SubCategory.js";
import Category from "../../models/Category.js";
import cloudinary from "../../config/cloudinary.js";

// ADD
export const addSubCategory = async (req, res) => {
  try {
    const { name, category , imageUrl} = req.body;

    if (!name || !category)
      return res.status(400).json({ message: "All fields required" });

    let imageData = {};

    // If image file is uploaded
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "sub-categories",
      });

      imageData = {
        url: upload.secure_url,
        public_id: upload.public_id,
      };
    }

    // OPTION 2: IMAGE URL
    else if (imageUrl) {
      imageData = {
        url: imageUrl,
        public_id: null, // external image, not cloudinary
      };
    }

    // IF NO IMAGE AT ALL
    else {
      return res.status(400).json({ message: "Image file or image URL required" });
    }

    const subCategory = await SubCategory.create({
      name,
      category,
      image: imageData,
    });

    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET
export const getSubCategories = async (req, res) => {
  try {
    const { categoryId } = req.params;

    //find the category (optional:get name)
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Get sub-categories
    const subCategories = await SubCategory.find({ category: categoryId });

    res.json({ categoryName: category.name, subCategories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteSubCategory = async (req, res) => {
  console.log("Delete ID:", req.params.id);
  const subCategory = await SubCategory.findById(req.params.id);

  if (!subCategory)
    return res.status(404).json({ message: "Not found" });

  if (subCategory.image?.public_id) {
    await cloudinary.uploader.destroy(subCategory.image.public_id);
  }

  await subCategory.deleteOne();
  res.json({ message: "Deleted successfully" });
};


// UPDATE
export const updateSubCategory = async (req, res) => {
  try {
    const { name, category , imageUrl} = req.body;
    const sub = await SubCategory.findById(req.params.id);

    if (!sub)
      return res.status(404).json({ message: "Not found" });

    if (name) sub.name = name;
    if (category) sub.category = category;

    if (req.file) {
      if (sub.image?.public_id) {
        await cloudinary.uploader.destroy(sub.image.public_id);
      }

      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "sub-categories",
      });

      sub.image = {
        url: upload.secure_url,
        public_id: upload.public_id,
      };
    }

    // IMAGE URL
    else if (imageUrl) {
      if (sub.image?.public_id) {
        await cloudinary.uploader.destroy(sub.image.public_id);
      }

      sub.image = {
        url: imageUrl,
        public_id: null,
      };
    }

    await sub.save();
    res.json(sub);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
