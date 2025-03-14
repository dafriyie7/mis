import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    city: { 
      type: String, 
      required: true },
    region: { 
      type: String, 
      required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Location", locationSchema);
