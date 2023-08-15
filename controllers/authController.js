// Import required packages and modules
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const University = require("../models/University");

// Retrieve JWT secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET;

// Handle university registration
exports.registerUniversity = async (req, res) => {
  try {
    const { email, password, name, location } = req.body;

    console.log("Registration request received:", req.body);

    // Check if the university with the provided email already exists
    const existingUniversity = await University.findOne({ email });
    if (existingUniversity) {
      return res.status(400).json({ error: "University already exists" });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Hashed password:", hashedPassword);

    // Create a new university
    const newUniversity = new University({
      email,
      password: hashedPassword,
      name,
      location,
    });

    await newUniversity.save();

    res.status(201).json({ message: "University registration successful" });
  } catch (error) {
    console.error("Error during university registration:", error);
    res.status(500).json({ error: "University registration failed" });
  }
};

// University login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login request received:", req.body);

    // Find the university with the provided email
    const university = await University.findOne({ email });
    if (!university) {
      console.log("User not found");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("Retrieved university:", university);

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, university.password);
    if (!passwordMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ id: university._id }, JWT_SECRET, {
      expiresIn: "1d",
      algorithm: "HS256",
    });

    console.log("Login successful. Token:", token);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

// Password change for a university
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    console.log("Change password request received:", req.body);

    // Find the university by ID and check if the current password is correct
    const university = await University.findById(req.userId);
    if (
      !university ||
      !(await bcrypt.compare(currentPassword, university.password))
    ) {
      return res.status(400).json({ error: "Invalid current password" });
    }
    
    // Hash the new password and update the university's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    university.password = hashedPassword;

    await university.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Password change failed" });
  }
};
