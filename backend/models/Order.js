import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    address: {
      name: String,
      phoneNo: String,
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
    },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["COD", "ONLINE"], required: true },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Placed", "Confirmed", "Shipped", "Delivered", "Cancelled", "Returned"],
      default: "Placed",
    },
    deliveredAt: Date,
    refundStatus: {
      type: String,
      enum: ["None", "Initiated", "Processed", "Completed"],
      default: "None",
    },

    paymentId: String, // Razorpay payment id
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
