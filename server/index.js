import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './db/connection.js';
import jobsRouter from './routes/jobs.js';
import dashboardRouter from './routes/dashboard.js';
import studyProgressRouter from './routes/studyProgress.js';
import { authenticate } from './middleware/auth.js';

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

// Mount routers with authentication
app.use('/api/jobs', authenticate, jobsRouter);
app.use('/api/dashboard', authenticate, dashboardRouter);
app.use('/api/study-progress', authenticate, studyProgressRouter);

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
