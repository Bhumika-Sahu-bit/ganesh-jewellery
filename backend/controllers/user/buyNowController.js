import Product from "../../models/Product.js";
import BuyNow from "../../models/BuyNow.js";

export const createBuyNow = async (req, res) => {
  try {
    const userId = req.user._id; // auth middleware se
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Missing data" });
    }

    // 1️⃣ Product verify
    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not available" });
    }

    // 2️⃣ Stock check
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // 3️⃣ Price calculation (SERVER SIDE)
    const price = product.price;
    const discount = product.discount || 0;
    const finalPrice =
      discount > 0 ? price - (price * discount) / 100 : price;

    const totalAmount = finalPrice * quantity;

    // 4️⃣ Old buyNow remove (one user = one buyNow)
    await BuyNow.deleteMany({ userId });

    // 5️⃣ Create Buy Now
    const buyNow = await BuyNow.create({
      userId,
      productId,
      quantity,
      price,
      discount,
      finalPrice,
      totalAmount,
      codAvailable: product.codAvailable,
    });

    return res.status(201).json({
      message: "Buy Now created",
      buyNowId: buyNow._id,
    });
  } catch (error) {
    console.error("BuyNow error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
