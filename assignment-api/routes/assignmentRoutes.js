const express    = require('express');
const router     = express.Router();
const {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment
} = require('../controllers/assignmentController');

// POST   /api/assignments        → Create
// GET    /api/assignments        → Read All  (supports ?status=&department=&subject=)
router.route('/')
  .post(createAssignment)
  .get(getAllAssignments);

// GET    /api/assignments/:id    → Read One
// PUT    /api/assignments/:id    → Update
// DELETE /api/assignments/:id    → Delete
router.route('/:id')
  .get(getAssignmentById)
  .put(updateAssignment)
  .delete(deleteAssignment);

module.exports = router;
