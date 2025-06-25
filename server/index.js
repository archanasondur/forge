import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/jobs', (req, res) => {
  res.json([
    { id: 1, company: 'Google', role: 'SWE Intern', status: 'Applied' },
    { id: 2, company: 'Amazon', role: 'Backend Intern', status: 'Wishlist' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
