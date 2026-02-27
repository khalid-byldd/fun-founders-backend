# Fun Founders Backend

Express + MongoDB backend with auth-protected routes for `teams`, `events`, `config`, plus a leaderboard endpoint.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your env file:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your MongoDB URI and auth secret.
4. Start server:
   ```bash
   npm run dev
   ```

## Base URL

`http://localhost:3000`

## Auth Flow

1. Create a user directly in MongoDB (`users` collection) with `username` and `password`.
2. Login to get token:
   - `POST /auth/login`
3. Send token for all protected routes:
   - `Authorization: Bearer <token>`

## Docs

- OpenAPI JSON: `GET /openapi.json`
- Swagger UI: `GET /docs`

## Routes

### Public
- `GET /health`
- `POST /auth/login`

Login body:
```json
{
  "username": "john",
  "password": "secret123"
}
```

### Protected (require Bearer token)

### Teams CRUD
- `POST /teams`
- `GET /teams`
- `GET /teams/:id`
- `PUT /teams/:id`
- `DELETE /teams/:id`

Body:
```json
{
  "name": "Team Alpha",
  "captain": "John",
  "season": "2024",
  "logo": "https://cdn/logo.png",
  "members": ["John", "Jane"]
}
```

### Team Member Management
- `POST /teams/:id/members` (add member)
- `DELETE /teams/:id/members` (remove member)

Body:
```json
{
  "member": "Jane"
}
```

### Events CRUD
- `POST /events`
- `GET /events`
- `GET /events/:id`
- `PUT /events/:id`
- `DELETE /events/:id`

Body:
```json
{
  "season": "2024",
  "winner": "<team_object_id>",
  "name": "Final Match",
  "logo": "https://cdn/event.png",
  "scores": [
    { "team_id": "<team_object_id>", "score": 60 },
    { "team_id": "<team_object_id>", "score": 40 }
  ]
}
```

### Config CRUD
- `POST /config`
- `GET /config`
- `GET /config/:id`
- `PUT /config/:id`
- `DELETE /config/:id`

Body:
```json
{
  "current_season": "2024",
  "seasons": ["2023", "2024"]
}
```

### Leaderboard
- `POST /leaderboard`

Body:
```json
{
  "season": "2024"
}
```

Response:
```json
[
  {
    "team_id": "<team_object_id>",
    "team_name": "Team Alpha",
    "scores": 100
  }
]
```
