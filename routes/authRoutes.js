const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Defining routes 
router.post("/registerUniversity", authController.registerUniversity);
router.post("/login", authController.login);

module.exports = router;
