import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import Brand from "../models/Brand.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Price from "../models/Price.js";
import Location from "../models/Location.js";

dotenv.config();

// Connect to MongoDB
console.log("🔗 Connecting to MongoDB...");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

const seedProducts = async () => {
  try {
    const categories = await Category.find();
    const locations = await Location.find();
    const brands = await Brand.find();

    if (
      categories.length === 0 ||
      locations.length === 0 ||
      brands.length === 0
    ) {
      console.log(
        "⚠️ Please add categories, locations, and brands before seeding!"
      );
      mongoose.connection.close();
      return;
    }

    const products = [];

    for (let i = 0; i < 100; i++) {
      const category = faker.helpers.arrayElement(categories);
      const location = faker.helpers.arrayElement(locations);
      const brand = faker.helpers.arrayElement(brands);

      // Create and save a new product
      const product = new Product({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: category._id,
        brand: brand._id,
        images: [faker.image.url(), faker.image.url()],
        location: location._id,
      });

      await product.save(); // Save first to get `_id`

      // Create and save a new price entry linked to the product
      const price = new Price({
        product: product._id,
        amount: parseFloat(faker.commerce.price({ min: 10, max: 5000 })),
        currency: "GHC",
        validFrom: new Date(),
      });

      await price.save();

      products.push(product);
    }

    console.log(`✅ Successfully added ${products.length} dummy products!`);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    mongoose.connection.close();
  }
};

// Run the script
seedProducts();
