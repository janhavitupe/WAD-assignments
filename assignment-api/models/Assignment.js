const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true
    },
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true
    },
    department: {
      type: String,
      enum: [
        'Computer Science & Engineering',
        'Electronics & Communication',
        'Mechanical Engineering',
        'Civil Engineering',
        'MBA',
        'Mathematics & Computing'
      ],
      required: [true, 'Department is required']
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required']
    },
    status: {
      type: String,
      enum: ['Pending', 'Submitted', 'Graded', 'Late'],
      default: 'Pending'
    },
    marks: {
      type: Number,
      min: 0,
      max: 100,
      default: null
    }
  },
  {
    timestamps: true   // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Assignment', assignmentSchema);
