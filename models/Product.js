import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true },
    description: { 
      type: String, 
      required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: { 
      type: String },
    images: [{ 
      type: String, 
      required: true }],
    location: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Location" },
    price: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Price" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
