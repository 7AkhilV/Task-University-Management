// Import required packages and modules
const jwt = require("jsonwebtoken");
const University = require("../models/University");

// JWT secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET;

// Create a new university
exports.createUniversity = async (req, res) => {
  const { name, location, email, password } = req.body;
  try {
    // Create a new University instance and save it to the database
    const newUniversity = new University({ name, location, email, password });
    await newUniversity.save();
    res.status(201).json({ message: "University created successfully" });
  } catch (error) {
    console.error("Error creating university:", error);
    res.status(500).json({ error: "Failed to create university" });
  }
};

// Get all universities
exports.getAllUniversities = async (req, res) => {
  try {
    // Retrieve and send all university records from the database
    const universities = await University.find();
    res.status(200).json(universities);
  } catch (error) {
    console.error("Error fetching universities:", error);
    res.status(500).json({ error: "Failed to fetch universities" });
  }
};

// Update a university by ID
exports.updateUniversityById = async (req, res) => {
  const { name, location, email, password } = req.body;
  const universityId = req.params.id;
  try {
    // Find and update the university by ID, returning the updated record
    const updatedUniversity = await University.findByIdAndUpdate(
      universityId,
      { name, location, email, password },
      { new: true }
    );
    res.status(200).json(updatedUniversity);
  } catch (error) {
    console.error("Error updating university:", error);
    res.status(500).json({ error: "Failed to update university" });
  }
};

// Delete a university by ID
exports.deleteUniversityById = async (req, res) => {
  const universityId = req.params.id;
  try {
    // Find and delete the university by ID
    await University.findByIdAndDelete(universityId);
    res.status(200).json({ message: "University deleted successfully" });
  } catch (error) {
    console.error("Error deleting university:", error);
    res.status(500).json({ error: "Failed to delete university" });
  }
};
