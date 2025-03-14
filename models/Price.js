import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
  {
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product",
        required: true,
    },
    amount: { 
        type: Number, 
        required: true },
    currency: { 
        type: String, 
        required: true, default: "GHC" },
    validFrom: { 
        type: Date, 
        required: true, 
        default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Price", priceSchema);
