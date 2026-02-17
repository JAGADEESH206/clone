# PulseStream - Full-Stack Music Streaming App

PulseStream is a Spotify-inspired full-stack music streaming platform with a dark theme UI, responsive React frontend, Express/MongoDB backend, JWT auth, playlists, likes, search, history tracking, and admin upload APIs.

## Tech Stack

- **Frontend:** React + Vite, Tailwind CSS, React Router, Context API
- **Backend:** Node.js, Express.js, Mongoose, JWT, bcrypt
- **Database:** MongoDB
- **Storage:** Local upload directory (`backend/uploads`) for demo; can be replaced by S3/Cloudinary

## Folder Structure

```text
.
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── seed
│   │   └── utils
│   ├── uploads
│   ├── package.json
│   └── .env.example
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   └── styles
│   └── package.json
└── README.md
```

## Core Features

- JWT login/signup/logout
- Protected routes and role-based admin APIs
- Browse songs, artists, albums
- Search songs/artists/albums
- Create/update/delete playlists and add/remove songs
- Like/unlike songs
- Recently played tracking
- Music player with play/pause, next/prev, seek progress, volume, shuffle, repeat
- Range-based audio streaming endpoint (`206 Partial Content`)
- Admin uploads for songs, cover art, artist images

## Database Models

- **User**: `name`, `email`, `password`, `playlists`, `likedSongs`, `history`, `role`
- **Song**: `title`, `artistId`, `albumId`, `audioUrl`, `coverImage`, `duration`, `plays`
- **Artist**: `name`, `bio`, `image`
- **Album**: `title`, `artistId`, `coverImage`, `songs`
- **Playlist**: `userId`, `name`, `songs`

## API Endpoints

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Songs & Streaming
- `GET /api/songs`
- `GET /api/songs/:id`
- `GET /api/songs/:id/stream`

### Search
- `GET /api/search?q=<term>`

### Catalog
- `GET /api/catalog/artists`
- `GET /api/catalog/artists/:id`
- `GET /api/catalog/albums`
- `GET /api/catalog/albums/:id`

### Playlists (auth required)
- `GET /api/playlists`
- `POST /api/playlists`
- `PATCH /api/playlists/:id`
- `DELETE /api/playlists/:id`
- `POST /api/playlists/:id/songs`
- `DELETE /api/playlists/:id/songs/:songId`

### User (auth required)
- `GET /api/users/me`
- `PATCH /api/users/likes/:songId`
- `POST /api/users/history`

### Admin (admin auth required)
- `POST /api/admin/artists` (image upload)
- `POST /api/admin/albums` (cover upload)
- `POST /api/admin/songs` (audio + cover upload)

## Setup Instructions

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Optional frontend env:

```bash
# frontend/.env
VITE_API_URL=http://localhost:5000/api
```

## Deployment

- **Frontend on Vercel:** Set `VITE_API_URL` to deployed backend URL + `/api`
- **Backend on Render/Railway:** Set `MONGO_URI`, `MONGO_DB_NAME`, `JWT_SECRET`
- Use managed object storage (S3/Cloudinary) for production audio/image uploads

## Security & Performance Notes

- Passwords hashed with bcrypt
- JWT-protected APIs and admin-only middleware
- Input validation with `express-validator`
- CORS and environment-variable secrets
- Lazy-loaded song cover images
- Efficient byte-range streaming for audio playback

