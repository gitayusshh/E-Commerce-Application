import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: String,
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    image: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: { type: Number, default: 0, min: 0 },
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    offer: { type: Boolean, default: false },
  },
  { timestamps: true },
);
export default mongoose.model("Product", schema);
