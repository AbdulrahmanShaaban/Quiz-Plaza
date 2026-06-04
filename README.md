# Quiz Plaza

Battle your friends in real-time multiplayer quiz battles! Test your knowledge across multiple categories and earn your ninja rank.

## Features
- **Multiplayer Quiz Rooms** - Real-time battles with friends
- **Who Wants to Be a Millionaire** - Classic quiz show with lifelines
- **Solo Quiz** - Practice mode with ninja rank system
- **Daily Challenge** - Daily questions with streak tracking
- **6 Categories** - Sports, Food, Technology, Movies, Geography, Music
- **Ninja Ranks** - Earn ranks from Rookie to Shadow Ninja
- **User Authentication** - JWT-based auth with email verification

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Socket.io Client

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT + HTTP-only cookies
- Socket.io
- Nodemailer (Gmail SMTP)
- Cloudinary

## Project Structure
Quiz-Plaza/
├── frontend/     → Next.js App
└── backend/      → Express API

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Create new user |
| POST | /api/auth/login | Login + set cookie |
| POST | /api/auth/logout | Clear cookie |
| GET | /api/auth/me | Get current user |
| POST | /api/rooms/create | Create quiz room |
| POST | /api/rooms/join | Join quiz room |
| GET | /api/leaderboard | Get leaderboard |

## Getting Started

### Backend
```bash
cd backend
pnpm install
pnpm run dev
```

### Frontend
```bash
cd frontend
pnpm install
pnpm run dev
```

### Environment Variables

**Backend `.env`:**
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```
