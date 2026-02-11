# 🛠️ Forge Project – GitHub Issues for Task Tracking

This file contains GitHub Issues you can use to track your Forge development tasks. Each issue has a title, description, subtasks, and suggested labels.

---

## 🔧 BACKEND TASKS

### 📌 Issue 1: Setup PostgreSQL or SQLite for Job Tracker
**Labels:** `backend`, `setup`, `high-priority`

```
Set up a local database for persisting job applications.

- [ ] Install PostgreSQL (or SQLite for simplicity)
- [ ] Add `.env` file for DB credentials
- [ ] Install and configure a database client (Knex.js / Prisma / Sequelize)
- [ ] Test basic DB connection from Express backend
- [ ] Add database folder structure for migrations and seeds
```

---

### 📌 Issue 2: Create Job Table Schema and Migration
**Labels:** `backend`, `database`, `schema`

```
Design the `jobs` table and run initial migrations.

- [ ] Define schema: id, company, role, status, notes, created_at, updated_at, applied_at, deadline, resume_url
- [ ] Write and run migration
- [ ] Seed the table with mock job data
- [ ] Test with a DB viewer or query tool
```

---

### 📌 Issue 3: Implement Job Tracker REST API (CRUD)
**Labels:** `backend`, `API`, `jobs`

```
Add CRUD API endpoints for job applications.

- [ ] `GET /api/jobs` - Fetch all jobs
- [ ] `POST /api/jobs` - Add a new job
- [ ] `PUT /api/jobs/:id` - Update job
- [ ] `DELETE /api/jobs/:id` - Delete job
- [ ] Use async/await and try/catch blocks
- [ ] Add meaningful error responses
```

---

### 📌 Issue 4: Add Input Validation and Error Handling
**Labels:** `backend`, `validation`, `API`

```
Add basic data validation and centralized error handling.

- [ ] Use a middleware like `express-validator` or `zod`
- [ ] Validate job creation input (e.g., company and role required)
- [ ] Add a global error handler
- [ ] Return useful error messages
```

---

## 🎨 FRONTEND TASKS

### 📌 Issue 5: Integrate Job Tracker with Backend
**Labels:** `frontend`, `integration`, `jobs`

```
Connect the frontend job tracker to the backend API.

- [ ] Replace mock job data with fetch from `/api/jobs`
- [ ] Use React Query or useEffect for fetching
- [ ] Send POST request on form submit
- [ ] Add delete button with API call
- [ ] Add edit/update job support with PUT
```

---

### 📌 Issue 6: Enhance Job Tracker UI/UX
**Labels:** `frontend`, `UI/UX`

```
Improve the job tracker component interactions.

- [ ] Add dropdown to update status (Applied, Interview, etc.)
- [ ] Add deadline and application date fields
- [ ] Add loading and error states
- [ ] Disable submit button during loading
- [ ] Add toast notifications for success/failure
```

---

## 🧱 JOURNEY WALL TASKS

### 📌 Issue 7: Create Posts Table and API Routes
**Labels:** `backend`, `posts`, `content`

```
Set up schema and backend routes for blog-style posts.

- [ ] Create `posts` table: id, title, content, category, tags, created_at
- [ ] Seed 5–6 sample posts
- [ ] Create endpoints: GET, POST, PUT, DELETE for `/api/posts`
- [ ] Filter posts by category (Journeys, Tips, Roadmaps)
```

---

### 📌 Issue 8: Display Posts Dynamically on Journey Wall
**Labels:** `frontend`, `posts`, `UI`

```
Make Journey Wall dynamic using API data.

- [ ] Fetch posts from `/api/posts`
- [ ] Display posts in card format
- [ ] Add category filtering
- [ ] Add search by title/content
- [ ] Show loading and error states
```

---

### 📌 Issue 9: Create Admin Form to Add New Posts
**Labels:** `frontend`, `form`, `admin`

```
Add a basic form for creating blog posts from frontend.

- [ ] Create form with title, content, category, tags
- [ ] Submit new posts to `/api/posts`
- [ ] Add edit functionality for existing posts
- [ ] Optional: Hide form behind admin flag
```

---

## 🚀 DEPLOYMENT & POLISH

### 📌 Issue 10: Finalize Responsive UI and Theming
**Labels:** `frontend`, `design`, `responsive`

```
Make UI polished across devices.

- [ ] Review mobile and tablet layouts
- [ ] Add spacing/padding consistency
- [ ] Add focus/hover states
- [ ] Add Tailwind transitions or fade-ins
```

---

### 📌 Issue 11: Environment Configuration and Secrets
**Labels:** `infra`, `environment`

```
Prepare environment configuration for production.

- [ ] Create `.env` files for local and prod
- [ ] Store DB URL, API base URL, etc.
- [ ] Use `dotenv` in backend
- [ ] Ensure no secrets are pushed to GitHub
```

---

### 📌 Issue 12: Deploy Frontend and Backend
**Labels:** `infra`, `deployment`

```
Deploy project to public hosting platforms.

- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway or Render
- [ ] Host PostgreSQL on Supabase or Railway
- [ ] Update API URLs in frontend
- [ ] Test all features on deployed app
```

---

### 📌 Issue 13: Write Final README and Record Demo
**Labels:** `docs`, `showcase`

```
Add documentation and demo for recruiters and reviewers.

- [ ] Add setup instructions, tech stack, and features to `README.md`
- [ ] Add screenshots of Job Tracker + Journey Wall
- [ ] Optional: Record 1-min Loom demo
- [ ] Link live site in README
```