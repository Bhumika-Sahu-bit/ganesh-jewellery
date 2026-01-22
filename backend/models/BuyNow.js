import mongoose from "mongoose";

const buyNowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: Number,
    discount: Number,
    finalPrice: Number,

    totalAmount: {
      type: Number,
      required: true,
    },

    codAvailable: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("BuyNow", buyNowSchema);
