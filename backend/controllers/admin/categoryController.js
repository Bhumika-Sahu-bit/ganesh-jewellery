import Category from "../../models/Category.js";
import cloudinary from "../../config/cloudinary.js";

/* ================= ADD CATEGORY ================= */
export const addCategory = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    let imageData = {};

    // If image file is uploaded
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "categories",
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

    const category = await Category.create({
      name,
      image: imageData,
    });

    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= GET CATEGORIES ================= */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= DELETE CATEGORY ================= */
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (category.image?.public_id) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }

    await category.deleteOne();

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= UPDATE CATEGORY ================= */
export const updateCategory = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    if (name) category.name = name;

    // FILE UPLOAD
    if (req.file) {
      if (category.image?.public_id) {
        await cloudinary.uploader.destroy(category.image.public_id);
      }

      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "categories",
      });

      category.image = {
        url: upload.secure_url,
        public_id: upload.public_id,
      };
    }

    // IMAGE URL
    else if (imageUrl) {
      if (category.image?.public_id) {
        await cloudinary.uploader.destroy(category.image.public_id);
      }

      category.image = {
        url: imageUrl,
        public_id: null,
      };
    }

    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

