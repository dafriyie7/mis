import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import Location from "../models/Location.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

// List of Ghanaian cities and their regions
const ghanaLocations = [
  { city: "Accra", region: "Greater Accra" },
  { city: "Kumasi", region: "Ashanti" },
  { city: "Tamale", region: "Northern" },
  { city: "Takoradi", region: "Western" },
  { city: "Cape Coast", region: "Central" },
  { city: "Koforidua", region: "Eastern" },
  { city: "Sunyani", region: "Bono" },
  { city: "Bolgatanga", region: "Upper East" },
  { city: "Wa", region: "Upper West" },
  { city: "Ho", region: "Volta" },
  { city: "Techiman", region: "Bono East" },
  { city: "Tema", region: "Greater Accra" },
  { city: "Obuasi", region: "Ashanti" },
  { city: "Sekondi", region: "Western" },
  { city: "Nkawkaw", region: "Eastern" },
];

const seedLocations = async () => {
  try {
    await Location.insertMany(ghanaLocations);
    console.log("✅ Ghanaian locations added successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error adding locations:", error);
    mongoose.connection.close();
  }
};

seedLocations();
