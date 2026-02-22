import express from 'express';
import { query } from '../db/connection.js';

const router = express.Router();

// GET /api/dashboard/job-metrics — Aggregated job statistics
router.get('/job-metrics', async (req, res) => {
  try {
    const statusCounts = await query(`
      SELECT
        COUNT(*)::int                                              AS total,
        COUNT(*) FILTER (WHERE status = 'Applied')::int            AS applied,
        COUNT(*) FILTER (WHERE status = 'OA')::int                 AS oa,
        COUNT(*) FILTER (WHERE status IN ('Interview','Interview Scheduled'))::int AS interviewing,
        COUNT(*) FILTER (WHERE status IN ('Offer','Accepted'))::int AS offers,
        COUNT(*) FILTER (WHERE status = 'Rejected')::int           AS rejected
      FROM jobs
      WHERE user_id = $1
    `, [req.user.id]);

    const row = statusCounts.rows[0];
    const responded = row.interviewing + row.offers + row.rejected;
    const responseRate = row.total > 0 ? parseFloat(((responded / row.total) * 100).toFixed(1)) : 0;

    // Weekly application counts
    const weeklyResult = await query(`
      SELECT
        COUNT(*) FILTER (WHERE applied_at >= CURRENT_DATE - INTERVAL '7 days')::int  AS this_week,
        COUNT(*) FILTER (WHERE applied_at >= CURRENT_DATE - INTERVAL '14 days'
                           AND applied_at <  CURRENT_DATE - INTERVAL '7 days')::int  AS last_week
      FROM jobs
      WHERE user_id = $1
    `, [req.user.id]);

    const w = weeklyResult.rows[0];
    const weeklyTrend = w.last_week > 0
      ? Math.round(((w.this_week - w.last_week) / w.last_week) * 100)
      : w.this_week > 0 ? 100 : 0;

    res.json({
      ...row,
      responseRate,
      weeklyApplications: w.this_week,
      weeklyTrend
    });
  } catch (error) {
    console.error('Error fetching job metrics:', error);
    res.status(500).json({ error: 'Failed to fetch job metrics', message: error.message });
  }
});

// GET /api/dashboard/prep-metrics — Study progress summary
router.get('/prep-metrics', async (req, res) => {
  try {
    const result = await query(`
      SELECT
        COUNT(*)::int                                AS total_count,
        COUNT(*) FILTER (WHERE completed)::int       AS completed_count,
        section,
        COUNT(*) FILTER (WHERE NOT completed)::int   AS incomplete
      FROM study_progress
      WHERE user_id = $1
      GROUP BY section
      ORDER BY incomplete DESC
    `, [req.user.id]);

    const rows = result.rows;
    const totalCount = rows.reduce((s, r) => s + r.total_count, 0);
    const completedCount = rows.reduce((s, r) => s + r.completed_count, 0);
    const progressPercent = totalCount > 0 ? parseFloat(((completedCount / totalCount) * 100).toFixed(1)) : 0;

    // Weakest domain = most incomplete topics
    const weakestDomain = rows.length > 0 ? rows[0].section : null;

    // Last studied topic
    const lastStudied = await query(`
      SELECT topic_id, label, completed_at
      FROM study_progress
      WHERE completed = true AND user_id = $1
      ORDER BY completed_at DESC NULLS LAST
      LIMIT 1
    `, [req.user.id]);

    const last = lastStudied.rows[0] || null;

    res.json({
      progressPercent,
      completedCount,
      totalCount,
      weakestDomain,
      lastStudiedTopic: last ? last.label : null,
      lastStudiedAt: last ? last.completed_at : null
    });
  } catch (error) {
    console.error('Error fetching prep metrics:', error);
    res.status(500).json({ error: 'Failed to fetch prep metrics', message: error.message });
  }
});

// GET /api/dashboard/activity — Activity feed data
router.get('/activity', async (req, res) => {
  try {
    // Upcoming interview (earliest future interview)
    const upcomingResult = await query(`
      SELECT company, role, follow_up_date
      FROM jobs
      WHERE status IN ('Interview','Interview Scheduled')
        AND (follow_up_date >= CURRENT_DATE OR follow_up_date IS NULL)
        AND user_id = $1
      ORDER BY follow_up_date ASC NULLS LAST
      LIMIT 1
    `, [req.user.id]);

    // Weekly application count
    const weeklyResult = await query(`
      SELECT COUNT(*)::int AS count
      FROM jobs
      WHERE applied_at >= CURRENT_DATE - INTERVAL '7 days' AND user_id = $1
    `, [req.user.id]);

    // Suggested next topic (first incomplete topic)
    const suggestedResult = await query(`
      SELECT topic_id, label, section
      FROM study_progress
      WHERE completed = false AND user_id = $1
      ORDER BY id ASC
      LIMIT 1
    `, [req.user.id]);

    // Study streak: count consecutive days with at least one completion
    const streakResult = await query(`
      WITH daily AS (
        SELECT DISTINCT completed_at::date AS day
        FROM study_progress
        WHERE completed = true AND completed_at IS NOT NULL AND user_id = $1
      ),
      numbered AS (
        SELECT day, day - (ROW_NUMBER() OVER (ORDER BY day))::int AS grp
        FROM daily
      )
      SELECT COUNT(*)::int AS streak
      FROM numbered
      WHERE grp = (SELECT grp FROM numbered WHERE day = CURRENT_DATE LIMIT 1)
    `, [req.user.id]);

    res.json({
      upcomingInterview: upcomingResult.rows[0] || null,
      weeklyApplications: weeklyResult.rows[0]?.count || 0,
      suggestedTopic: suggestedResult.rows[0] || null,
      studyStreak: streakResult.rows[0]?.streak || 0
    });
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ error: 'Failed to fetch activity', message: error.message });
  }
});

export default router;
