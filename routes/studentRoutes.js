// Import required packages and modules
const express = require("express");
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");
const { body, validationResult } = require("express-validator"); // Import express-validator

const router = express.Router();

// Create a new student with data validation
router.post(
  "/students",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("subjectList")
      .isArray({ min: 1 })
      .withMessage("At least one subject is required"),
    body("university").notEmpty().withMessage("University ID is required"),
  ],
  studentController.createStudent
);

// Get all students
router.get("/students", studentController.getAllStudents);

// Get a specific student by ID
router.get("/students/:id", studentController.getStudentById);

// Update a student by ID
router.put("/students/:id", studentController.updateStudentById);

// Delete a student by ID
router.delete("/students/:id", studentController.deleteStudentById);

// UNIVERSITY CAN ONLY AUTHORIZE THE EVENTS*

// Create a student event with data validation
router.post(
  "/students/:id/events",
  authMiddleware.verifyToken,
  [
    body("name").notEmpty().withMessage("Event name is required"),
    body("date").notEmpty().withMessage("Event date is required"),
    // Add more validation checks for other event data if needed
  ],
  studentController.createStudentEvent
);

// Get all student events
router.get(
  "/students/:id/events",
  authMiddleware.verifyToken,
  studentController.getAllStudentEvents
);

// Get a specific student event by ID
router.get(
  "/students/:id/events/:eventId",
  authMiddleware.verifyToken,
  studentController.getStudentEventById
);

// Update a student event by ID with data validation
router.put(
  "/students/:id/events/:eventId",
  authMiddleware.verifyToken,
  [
    body("name").notEmpty().withMessage("Event name is required"),
    body("date").notEmpty().withMessage("Event date is required"),
  ],
  studentController.updateStudentEventById
);

// Delete a student event by ID
router.delete(
  "/students/:id/events/:eventId",
  authMiddleware.verifyToken,
  studentController.deleteStudentEventById
);

module.exports = router;
