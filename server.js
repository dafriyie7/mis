import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.redirect('/api')
})
app.use("/api", routes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB Connection Error:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));