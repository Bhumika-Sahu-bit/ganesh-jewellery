import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    productCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      default: null,
    },

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    finalPrice: {
      type: Number,
    },

    stock: {
      type: Number,
      default: 0,
    },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],

    shortDesc: String,
    description: String,

    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isNewProduct: {
      type: Boolean,
      default: false,
    },

    codAvailable: {
      type: Boolean,
      default: true,
    },

    returnAvailable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/* AUTO FINAL PRICE */
productSchema.pre("save", async function () {
  const price = Number(this.price) || 0;
  const discount = Number(this.discount) || 0;
  this.finalPrice = discount > 0 ? price - (price * discount) / 100 : price;
});



export default mongoose.model("Product", productSchema);
