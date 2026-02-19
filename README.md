# TaskApp — Full-stack (React + Express + MySQL)

This repository contains a full-stack task management app with authentication.

Overview
- Backend: Node.js, Express, MySQL, JWT authentication
- Frontend: React (functional components), Bootstrap 5, Context API

Setup

1) Clone/open this folder in your terminal.

2) Database: create the MySQL database and tables

- Edit `server/.env.example` and save as `.env` in `server/` with your DB credentials and `JWT_SECRET`.
- Import the SQL schema (from `server/sql/schema.sql`) into your MySQL server, for example using the MySQL CLI:

```bash
mysql -u root -p < server/sql/schema.sql
```

3) Start backend

```bash
cd server
npm install
npm run dev    # requires nodemon, or use `npm start` to run once
```

The server will run on port 5000 by default.

4) Start frontend

```bash
cd client
npm install
npm start
```

The React app expects the API at `http://localhost:5000/api` by default. To change, set `REACT_APP_API_URL`.

Usage
- Register a user, then login. The JWT is stored in `localStorage` and automatically attached to requests.
- Dashboard is protected and allows CRUD on tasks.

Notes
- Passwords are hashed with `bcrypt`.
- Protected routes use JWT middleware.
- For production, use secure environment variable management and HTTPS.

Deployment to GitHub

1) Initialize git and push to a new GitHub repository (create repo on GitHub web first):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

2) The repository includes GitHub Actions workflows at `.github/workflows/ci.yml` and `.github/workflows/deploy-frontend.yml`. On push to `main`, the CI job will build backend and frontend. The deploy workflow will build the React app and publish the `client/build` folder to GitHub Pages automatically.

3) GitHub Pages will serve the site from the `gh-pages` branch created by the workflow. If you prefer, configure the Pages settings to point to the `gh-pages` branch.

4) Add repository secrets if needed (for backend deployments or tests): `JWT_SECRET`, any database connection strings. For the Pages deployment workflow, the default `GITHUB_TOKEN` is sufficient.

