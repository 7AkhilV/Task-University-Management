const mongoose = require("mongoose");

//Student Schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subjectList: [String],
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University", // Reference to the University model
  },
  
  // ONLY UNIVERSITY COULD IMPLEMENT EVENTS*
  events: [
    {
      title: String,
      description: String,
      date: Date,
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
