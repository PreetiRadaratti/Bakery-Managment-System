// Import required dependencies
require("dotenv").config(); // To load environment variables from the .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize the Express application
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Load environment variables
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bakeryDB"; // MongoDB connection string
const PORT = process.env.PORT || 3000; // Port number for the server

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Define models
const User = require("./models/User");
const Order = require("./models/Order");
const Booking = require("./models/Booking");

// Sample route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Bakery Backend API!");
});

// User routes
app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Order routes
app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Booking routes
app.post("/api/bookings", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
