import express from 'express';
import { query } from '../db/connection.js';

const router = express.Router();

// GET /api/study-progress — List all topics with completion state for a user
router.get('/', async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM study_progress WHERE user_id = $1 ORDER BY id ASC',
            [req.user.id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching study progress:', error);
        res.status(500).json({ error: 'Failed to fetch study progress', message: error.message });
    }
});

// PUT /api/study-progress/:topicId — Toggle topic completion
router.put('/:topicId', async (req, res) => {
    try {
        const { topicId } = req.params;

        // Toggle completed and set/clear completed_at
        const result = await query(
            `UPDATE study_progress
       SET completed    = NOT completed,
           completed_at = CASE WHEN NOT completed THEN CURRENT_TIMESTAMP ELSE NULL END
       WHERE topic_id = $1 AND user_id = $2
       RETURNING *`,
            [topicId, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Topic not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error toggling topic:', error);
        res.status(500).json({ error: 'Failed to toggle topic', message: error.message });
    }
});

// POST /api/study-progress/seed — Idempotent seed of initial topics
router.post('/seed', async (req, res) => {
    try {
        const topics = [
            { topic_id: 'arrays', section: 'DSA', label: 'Arrays & Hashing' },
            { topic_id: 'two-pointers', section: 'DSA', label: 'Two Pointers' },
            { topic_id: 'scaling', section: 'System Design', label: 'Scaling Fundamentals' },
            { topic_id: 'databases', section: 'System Design', label: 'SQL vs NoSQL' },
            { topic_id: 'star', section: 'Behavioral', label: 'STAR Method Practice' },
        ];

        for (const t of topics) {
            await query(
                `INSERT INTO study_progress (user_id, topic_id, section, label)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (user_id, topic_id) DO NOTHING`,
                [req.user.id, t.topic_id, t.section, t.label]
            );
        }

        const result = await query('SELECT * FROM study_progress WHERE user_id = $1 ORDER BY id ASC', [req.user.id]);
        res.json({ message: 'Seed complete', topics: result.rows });
    } catch (error) {
        console.error('Error seeding topics:', error);
        res.status(500).json({ error: 'Failed to seed topics', message: error.message });
    }
});

export default router;
