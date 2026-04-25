require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────
app.use('/api/assignments', require('./routes/assignmentRoutes'));

// ── Health check ──────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'Assignment CRUD API is running',
    version: '1.0.0',
    endpoints: {
      'POST   /api/assignments':     'Create assignment',
      'GET    /api/assignments':     'Get all assignments (filter: ?status=&department=&subject=)',
      'GET    /api/assignments/:id': 'Get assignment by ID',
      'PUT    /api/assignments/:id': 'Update assignment',
      'DELETE /api/assignments/:id': 'Delete assignment'
    }
  });
});

// ── 404 handler ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global error handler ──────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
