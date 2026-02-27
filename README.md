# Fun Founders Backend

Express + PostgreSQL backend using **Drizzle ORM** with auth-protected routes for `teams`, `events`, `config`, plus leaderboard.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your Postgres connection.
4. Generate and run migrations:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```
5. Start server:
   ```bash
   npm run dev
   ```

## Environment

- `DATABASE_URL=postgres://user:pass@host:5432/dbname`
- `PORT=3000`
- `AUTH_SECRET=...`

## Auth Flow

1. Create a user row in `users` table with `username` and `password`.
2. `POST /auth/login` to get token.
3. Send token in `Authorization: Bearer <token>` for protected routes.

## Docs

- OpenAPI JSON: `GET /openapi.json`
- Swagger UI: `GET /docs`

## Routes

### Public
- `GET /health`
- `POST /auth/login`

### Protected
- Teams CRUD: `POST/GET /teams`, `GET/PUT/DELETE /teams/:id`
- Team members: `POST /teams/:id/members`, `DELETE /teams/:id/members`
- Events CRUD: `POST/GET /events`, `GET/PUT/DELETE /events/:id`
- Config CRUD: `POST/GET /config`, `GET/PUT/DELETE /config/:id`
- Leaderboard: `POST /leaderboard`

## Notes on DB shape

- `events` table stores event metadata (`season`, `winner`, `name`, `logo`).
- `event_scores` table stores one row per team score for each event.
- Leaderboard sums `event_scores.score` by `team_id` filtered by season.
