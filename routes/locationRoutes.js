// /routes/locationRoutes.js

import express from "express";
import {
  getLocations,
  createLocation,
} from "../controllers/locationController.js"; // Import the location controller

const router = express.Router();

// Get all locations
router.get("/", getLocations);

// Create a new location
router.post("/", createLocation);

export default router;
