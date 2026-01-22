import Cart from "../../models/Cart.js";

/* ===== Add product to cart ===== */
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [{ product: productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        // If product exists, update quantity
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({ product: productId, quantity: quantity || 1 });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product to cart" });
  }
};

/* ===== Get user cart ===== */
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    res.json(cart || { items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

/* ===== Remove item from cart ===== */
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove product from cart" });
  }
};

/* ===== Update quantity ===== */
export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update quantity" });
  }
};
