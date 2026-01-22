import Product from "../../models/Product.js";
import cloudinary from "../../config/cloudinary.js";
import { io } from "../../server.js";

/* ================= ADD PRODUCT ================= */
export const addProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const {
      name,
      productCode,
      category,
      subCategory,
      price,
      discount = 0,
      stock = 0,
      shortDesc,
      description,
    } = req.body;

    const codAvailable = req.body.codAvailable === "true";
    const returnAvailable = req.body.returnAvailable === "true";

    // REQUIRED VALIDATION
    if (!name || !productCode || !category || !price) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    let images = [];

    /* ===== FILE UPLOAD ===== */
    if (req.files && req.files.length > 0) {
      if (req.files.length > 8) {
        return res.status(400).json({ message: "Max 8 images allowed" });
      }

      for (const file of req.files) {
        const uploadRes = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });

        images.push({
          url: uploadRes.secure_url,
          public_id: uploadRes.public_id,
        });
      }
    }

    /* ===== IMAGE URLS ===== */
    if (req.body.imageUrls) {
      let urls = [];
      try {
        urls = JSON.parse(req.body.imageUrls);
      } catch {
        return res.status(400).json({ message: "Invalid imageUrls format" });
      }

      urls.forEach((urlObj) => {
        if (images.length < 8) {
          // Handle both string and object
          const url = typeof urlObj === "string" ? urlObj : urlObj.url;
          if (url) images.push({ url });
        }
      });
    }

    if (images.length === 0) {
      return res.status(400).json({ message: "At least one image required" });
    }

    const product = await Product.create({
      name,
      productCode,
      category,
      subCategory: subCategory || null,
      price,
      discount,
      stock,
      images,
      shortDesc,
      description,
      codAvailable,
      returnAvailable,
    });

    // real-time notification to admin clients
    io.emit("newProduct", {
      title: "New Product Added",
      message: product.name,
      time: new Date(),
    })

    res.status(201).json(product);
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET PRODUCTS ================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("subCategory", "name")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE PRODUCT ================= */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const {
      name,
      productCode,
      category,
      subCategory,
      price,
      discount,
      stock,
      shortDesc,
      description,
    } = req.body;

    product.name = name ?? product.name;
    product.productCode = productCode ?? product.productCode;
    product.category = category ?? product.category;
    product.subCategory =
      subCategory !== undefined ? subCategory || null : product.subCategory;
    product.price = price ?? product.price;
    product.discount = discount ?? product.discount;
    product.stock = stock ?? product.stock;
    product.shortDesc = shortDesc ?? product.shortDesc;
    product.description = description ?? product.description;

    product.codAvailable = req.body.codAvailable === "true";
    product.returnAvailable = req.body.returnAvailable === "true";

    /* ===== NEW FILE UPLOAD ===== */
    if (req.files && req.files.length > 0) {
      if (req.files.length > 8) {
        return res.status(400).json({ message: "Max 8 images allowed" });
      }

      // delete old cloudinary images
      for (const img of product.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }

      let newImages = [];
      for (const file of req.files) {
        const uploadRes = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });

        newImages.push({
          url: uploadRes.secure_url,
          public_id: uploadRes.public_id,
        });
      }

      product.images = newImages;
    }

    /* ===== ADD IMAGE URLS ===== */
    if (req.body.imageUrls) {
      let urls = [];
      try {
        urls = JSON.parse(req.body.imageUrls);
      } catch {
        return res.status(400).json({ message: "Invalid imageUrls format" });
      }

      urls.forEach((urlObj) => {
        if (product.images.length < 8) {
          const url = typeof urlObj === "string" ? urlObj : urlObj.url;
          if (url) product.images.push({ url });
        }
      });
    }

    await product.save();
    res.json(product);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    for (const img of product.images) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

