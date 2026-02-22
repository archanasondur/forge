import express from 'express';
import { query } from '../db/connection.js';

const router = express.Router();

// GET /api/jobs — Fetch all jobs
router.get('/', async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM jobs WHERE user_id = $1 ORDER BY created_at DESC',
            [req.user.id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs', message: error.message });
    }
});

// POST /api/jobs — Create a new job
router.post('/', async (req, res) => {
    try {
        const {
            company, role, status = 'Applied', notes,
            applied_at, deadline, location, salary_range,
            job_url, resume_url, resume_version, follow_up_date
        } = req.body;

        if (!company || !role) {
            return res.status(400).json({ error: 'Company and role are required fields' });
        }

        const result = await query(
            `INSERT INTO jobs
         (user_id, company, role, status, notes, applied_at, deadline,
          location, salary_range, job_url, resume_url, resume_version, follow_up_date)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       RETURNING *`,
            [req.user.id, company, role, status, notes, applied_at || null, deadline || null,
                location, salary_range, job_url, resume_url, resume_version || null, follow_up_date || null]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ error: 'Failed to create job', message: error.message });
    }
});

// PUT /api/jobs/:id — Update a job
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            company, role, status, notes,
            applied_at, deadline, location, salary_range,
            job_url, resume_url, resume_version, follow_up_date
        } = req.body;

        const result = await query(
            `UPDATE jobs
       SET company = $1, role = $2, status = $3, notes = $4,
           applied_at = $5, deadline = $6, location = $7,
           salary_range = $8, job_url = $9, resume_url = $10,
           resume_version = $11, follow_up_date = $12
       WHERE id = $13 AND user_id = $14
       RETURNING *`,
            [company, role, status, notes, applied_at || null, deadline || null,
                location, salary_range, job_url, resume_url,
                resume_version || null, follow_up_date || null, id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ error: 'Failed to update job', message: error.message });
    }
});

// DELETE /api/jobs/:id — Delete a job
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query('DELETE FROM jobs WHERE id = $1 AND user_id = $2 RETURNING *', [id, req.user.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ error: 'Failed to delete job', message: error.message });
    }
});

export default router;
