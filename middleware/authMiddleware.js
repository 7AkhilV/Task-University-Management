const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
  console.log("Middleware verifyToken is executed");
  const token = req.header("Authorization");
  console.log("Received token:", token); // Log the received token
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });
    console.log("Decoded token:", decoded); // Log the decoded token payload
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Error verifying token:", error); // Log any verification errors
    res.status(401).json({ error: "Invalid token" });
  }
};
