import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import Brand from "../models/Brand.js";
import Category from "../models/Category.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined. Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const generateBrandsAndCategories = async () => {
  try {
    // Generate random brands
    const brands = Array.from({ length: 10 }, () => ({
      name: faker.company.name(),
      logo: faker.image.url(), // Generates a random image URL
    }));

    // Generate random categories
    const categories = Array.from({ length: 10 }, () => ({
      name: faker.commerce.department(),
    }));

    await Brand.insertMany(brands);
    await Category.insertMany(categories);

    console.log("Fake brands and categories inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting data: ", error);
  }
};

generateBrandsAndCategories();
