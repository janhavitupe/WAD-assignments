const Assignment = require('../models/Assignment');

// ── CREATE  POST /api/assignments ─────────────────────────────────
const createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Assignment created successfully',
      data: assignment
    });
  } catch (err) {
    // Mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── READ ALL  GET /api/assignments ────────────────────────────────
const getAllAssignments = async (req, res) => {
  try {
    const { status, department, subject } = req.query;

    // Build optional filter from query params
    const filter = {};
    if (status)     filter.status     = status;
    if (department) filter.department = department;
    if (subject)    filter.subject    = new RegExp(subject, 'i');

    const assignments = await Assignment.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── READ ONE  GET /api/assignments/:id ────────────────────────────
const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: `Assignment not found with id: ${req.params.id}`
      });
    }

    res.status(200).json({ success: true, data: assignment });
  } catch (err) {
    // Invalid ObjectId format
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid assignment ID format' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── UPDATE  PUT /api/assignments/:id ──────────────────────────────
const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,           // return updated document
        runValidators: true  // run schema validators on update
      }
    );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: `Assignment not found with id: ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Assignment updated successfully',
      data: assignment
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid assignment ID format' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── DELETE  DELETE /api/assignments/:id ───────────────────────────
const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: `Assignment not found with id: ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Assignment deleted successfully',
      data: {}
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid assignment ID format' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment
};
