// Import studnet model
const Student = require("../models/Student");

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: "Failed to create student" });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// Get a specific student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

// Update a student by ID
exports.updateStudentById = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to update student" });
  }
};

// Delete a student by ID
exports.deleteStudentById = async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
};

//Student event can only be implemented by UNIVERSITY

// Create a student event
exports.createStudentEvent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Check if the authenticated university matches the student's university
    if (student.university.toString() !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Create and add the event to the student's events array
    const event = req.body;
    student.events.push(event);
    await student.save();

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to create student event" });
  }
};

// Get all student events
exports.getAllStudentEvents = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    // Check if the authenticated university matches the student's university
    if (student.university.toString() !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const events = student.events;
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student events" });
  }
};

// Get a specific student event by ID
exports.getStudentEventById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    // Check if the authenticated university matches the student's university
    if (student.university.toString() !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const eventId = req.params.eventId;
    const event = student.events.id(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student event" });
  }
};
// Update a student event by ID
exports.updateStudentEventById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Check if the authenticated university matches the student's university
    if (student.university.toString() !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const eventId = req.params.eventId;
    const event = student.events.id(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    // Update the event properties and save the student
    event.set(req.body);
    await student.save();

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to update student event" });
  }
};

// Delete a student event by ID
exports.deleteStudentEventById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    // Check if the authenticated university matches the student's university
    if (student.university.toString() !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const eventId = req.params.eventId;
    const event = student.events.id(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Remove the event from the student's events array and save
    event.remove();
    await student.save();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student event" });
  }
};
