const mongoose = require("mongoose");

// University Schema
const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const University = mongoose.model("University", universitySchema);

module.exports = University;
