// Load environment variables from a .env file
require("dotenv").config();

// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import route handlers
const universityRoutes = require("./routes/universityRoutes");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");

// Import middleware for verifying JWT tokens
const { verifyToken } = require("./middleware/authMiddleware");

const app = express();

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Parse incoming JSON data
app.use(bodyParser.json());

// Defining routes 
app.use("/auth", authRoutes);
app.use("/universities", universityRoutes);
app.use("/students", studentRoutes);

// Protected route requiring authentication
app.use("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Access granted" });
});

// start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
