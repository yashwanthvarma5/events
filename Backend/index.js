// Debug: Print email credentials to verify .env loading

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import eventRoutes from "./routes/event.routes.js";

dotenv.config();
// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅✅✅MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/users", userRoutes);
app.use("/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("Kreapt API Running");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀🚀Server running on port ${PORT}`);
});
