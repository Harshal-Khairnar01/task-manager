# Worksphere

Worksphere is a full-stack team task management application for organizing projects, assigning tasks, tracking member progress, and managing team access from one clean dashboard.

## Admin Login

Use the following admin account to access all management features:

```txt
Email: harshal.khairnar@ethara.ai
Password: 12345678
```

Admins can create and delete projects, add project members, assign tasks, manage the team directory, and view team progress reports.

## Features

- Secure email/password authentication with role-based access
- Admin and member dashboards
- Project creation, deletion, and member management
- Kanban-style task board with task status updates
- Task priority, due date, assignment, and comments
- Team directory with member delete confirmation modal
- Member progress tracking by project
- Notification panel for user activity updates
- Responsive UI built with React, Tailwind CSS, and Framer Motion
- REST API backend using Express, MongoDB, JWT, and Mongoose

## Tech Stack

**Frontend**

- React
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Framer Motion
- Axios
- React Hot Toast

**Backend**

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- bcrypt password hashing

## Project Structure

```txt
TEAM-TASK-MANAGER-main/
|-- backend/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   `-- server.js
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- store/
|   |   `-- utils/
|   `-- vite.config.js
`-- package.json
```

## Getting Started

### 1. Install Dependencies

From the project root:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 2. Configure Environment Variables

Create a `.env` file in the project root with the required backend values:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_SECRET_KEY=your_admin_signup_secret
PORT=5000
```

### 3. Run the App

Start frontend and backend together from the project root:

```bash
npm run dev
```

The app runs at:

```txt
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

The Vite dev server proxies `/api` requests to the backend.

## Useful Commands

Run frontend only:

```bash
npm run dev --prefix frontend
```

Run backend only:

```bash
npm run dev --prefix backend
```

Build frontend:

```bash
npm run build --prefix frontend
```

Build the full project:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Main Workflows

### Admin

1. Sign in using the admin credentials.
2. Create projects from the Projects page.
3. Add members to each project.
4. Create and assign tasks.
5. Track team progress from the project detail page.
6. Manage all users from the Team Directory.

### Member

1. Sign in or create a member account.
2. View assigned projects.
3. Update assigned task status.
4. Check personal progress from project pages.

## API Overview

Common API groups:

- `/api/auth` handles login, signup, profile, and account actions
- `/api/users` handles team directory and user management
- `/api/projects` handles project CRUD, members, and progress
- `/api/tasks` handles task CRUD, updates, and comments
- `/api/notifications` handles notification actions
- `/api/dashboard` handles dashboard statistics

## Notes

- Only admins can access team management and project deletion features.
- Deleting a project removes its associated tasks.
- Deleting a team member removes the user, removes them from projects, deletes projects they created, and unassigns their remaining tasks.
- Keep production credentials private and rotate demo passwords before deploying publicly.
