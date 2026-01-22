import Wishlist from "../../models/Wishlist.js";

/* ===== Add to wishlist ===== */
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();
     // Populate products before sending response
    await wishlist.populate("products");
    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
};

/* ===== Get wishlist ===== */
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate("products");
    
    if (!wishlist) return res.json([]); // empty wishlist
  res.json(wishlist.products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

/* ===== Remove from wishlist ===== */
export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
    await wishlist.save();

    await wishlist.populate("products");
    res.json(wishlist.products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove from wishlist" });
  }
};
