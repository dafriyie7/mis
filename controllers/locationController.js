import Location from "../models/Location.js";

// @desc    Get all locations
// @route   GET /api/locations
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Create a new location
// @route   POST /api/locations
export const createLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    const savedLocation = await location.save();
    res.status(201).json(savedLocation);
  } catch (error) {
    res.status(400).json({ message: "Invalid location data", error });
  }
};
