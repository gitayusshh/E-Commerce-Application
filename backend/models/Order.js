import mongoose from "mongoose";
const itemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    price: Number,
    quantity: Number,
    image: String,
  },
  { _id: false },
);

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [itemSchema],
    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
    },
    paymentMethod: { type: String, enum: ["COD", "ONLINE"], default: "COD" },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

        paymentId: {
      type: String,
      default: null,
    },

    
    status: {
      type: String,
      enum: [
        "Placed",
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },
    totalAmount: Number,
  },
  { timestamps: true },
);
export default mongoose.model("Order", schema);
