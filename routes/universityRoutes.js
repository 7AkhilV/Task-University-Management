// Import required packages and modules
const express = require("express");
const universityController = require("../controllers/universityController");
const authMiddleware = require("../middleware/authMiddleware");
const { body, validationResult } = require("express-validator"); 

const router = express.Router();

// Protected routes: CRUD operations for universities

// Create a new university with data validation
router.post(
  "/",
  authMiddleware.verifyToken, // Middleware to verify JWT token
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("location").notEmpty().withMessage("Location is required"),
  ],
  universityController.createUniversity
);

// Get all universities
router.get(
  "/",
  authMiddleware.verifyToken,
  universityController.getAllUniversities
);

// Update a university by ID with data validation
router.put(
  "/:id",
  authMiddleware.verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("location").notEmpty().withMessage("Location is required"),
  ],
  universityController.updateUniversityById
);

// Delete a university by ID
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  universityController.deleteUniversityById
);

module.exports = router;
