# Forge

**Built for the ones who are forging their path, not just following it.**

A full-stack career companion that helps students and developers track job applications, analyze job descriptions, plan skills, build projects, and stay motivated.

## Getting Started

Frontend: React  
Backend: Node.js (Express)  
Database: PostgreSQL
=======
Forge is a full-stack career companion that helps students and early-career devs track their job applications, analyze job descriptions, and stay inspired through real-world stories.

---

- React (Vite)
- React Router
- Node.js (Express)
- PostgreSQL
- CSS (custom dark theme)

---

## Features
- Landing page with motivational branding
- JourneyWall to browse success stories and roadmaps
- Job Tracker with statistics and application tracking
- Coming soon: Kanban Board, Resume Insights, AI JD Parser

---

## How to Run Locally

### Frontend (React)
```bash
git clone https://github.com/yourusername/forge
cd forge/client
npm install
npm run dev
```
Frontend will be available at: http://localhost:5173

### Backend (Node.js + PostgreSQL)
```bash
cd forge/server
npm install
node index.js
```
Backend will be available at: http://localhost:3001

### Database Setup
1. Install PostgreSQL locally: `brew install postgresql@15`
2. Start PostgreSQL service: `brew services start postgresql@15`
3. Create database: `createdb forge_db`
4. Run migrations: `cd server && node db/migrate.js`

### Environment Variables
Create `.env` file in server directory:
```env
DATABASE_URL=postgresql://username@localhost:5432/forge_db
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```
