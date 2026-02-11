import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query, testConnection } from './db/connection.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());

// Test database connection on startup
testConnection().then((success) => {
  if (!success) {
    console.error('❌ Failed to connect to database. Server may not function properly.');
  }
});

// Routes

// GET /api/jobs - Fetch all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM jobs ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ 
      error: 'Failed to fetch jobs',
      message: error.message 
    });
  }
});

// POST /api/jobs - Create a new job
app.post('/api/jobs', async (req, res) => {
  try {
    const { 
      company, 
      role, 
      status = 'Applied', 
      notes, 
      applied_at, 
      deadline,
      location,
      salary_range,
      job_url,
      resume_url
    } = req.body;

    // Validation
    if (!company || !role) {
      return res.status(400).json({ 
        error: 'Company and role are required fields' 
      });
    }

    const result = await query(
      `INSERT INTO jobs (company, role, status, notes, applied_at, deadline, location, salary_range, job_url, resume_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [company, role, status, notes, applied_at || null, deadline || null, location, salary_range, job_url, resume_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ 
      error: 'Failed to create job',
      message: error.message 
    });
  }
});

// PUT /api/jobs/:id - Update a job
app.put('/api/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      company, 
      role, 
      status, 
      notes, 
      applied_at, 
      deadline,
      location,
      salary_range,
      job_url,
      resume_url
    } = req.body;

    const result = await query(
      `UPDATE jobs 
       SET company = $1, role = $2, status = $3, notes = $4, 
           applied_at = $5, deadline = $6, location = $7, 
           salary_range = $8, job_url = $9, resume_url = $10
       WHERE id = $11
       RETURNING *`,
      [company, role, status, notes, applied_at || null, deadline || null, location, salary_range, job_url, resume_url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ 
      error: 'Failed to update job',
      message: error.message 
    });
  }
});

// DELETE /api/jobs/:id - Delete a job
app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM jobs WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ 
      error: 'Failed to delete job',
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const dbTest = await testConnection();
    res.json({ 
      status: 'OK', 
      database: dbTest ? 'Connected' : 'Disconnected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Error', 
      database: 'Disconnected',
      error: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
