# PGSManager - Artist Management SaaS

A complete SaaS platform for managing artist careers, scheduling, post ideas, and finances.

## Features

✨ **Multi-Artist Management** - Manage multiple artists from one account
📅 **Scheduling** - Track shows, rehearsals, meetings, and events
💰 **Financial Tracking** - Monitor income and expenses per artist
📝 **Content Ideas** - Organize and schedule social media content
🎯 **Career Milestones** - Track career goals and achievements
🎤 **Booked Shows** - Manage venue details, ticket pricing, and payments

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL
- **Authentication**: JWT
- **State Management**: Zustand

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+

### Installation

1. Clone the repository
```bash
git clone https://github.com/zinizey/pgsmanager.git
cd pgsmanager
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Set up the database
```bash
# Run migrations
npm run db:migrate

# Seed sample data (optional)
npm run db:seed
```

5. Start development servers
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update user profile

### Artists
- `GET /api/artists` - List all artists
- `POST /api/artists` - Create new artist
- `GET /api/artists/:artistId` - Get artist details
- `PUT /api/artists/:artistId` - Update artist
- `DELETE /api/artists/:artistId` - Delete artist

### Career Milestones
- `GET /api/artists/:artistId/milestones` - List milestones
- `POST /api/artists/:artistId/milestones` - Create milestone
- `PUT /api/artists/:artistId/milestones/:milestoneId` - Update milestone
- `DELETE /api/artists/:artistId/milestones/:milestoneId` - Delete milestone

### Post Ideas
- `GET /api/artists/:artistId/post-ideas` - List post ideas
- `POST /api/artists/:artistId/post-ideas` - Create post idea
- `PUT /api/artists/:artistId/post-ideas/:ideaId` - Update post idea
- `DELETE /api/artists/:artistId/post-ideas/:ideaId` - Delete post idea

### Scheduled Events
- `GET /api/artists/:artistId/events` - List events
- `POST /api/artists/:artistId/events` - Create event
- `PUT /api/artists/:artistId/events/:eventId` - Update event
- `DELETE /api/artists/:artistId/events/:eventId` - Delete event

### Financials
- `GET /api/artists/:artistId/financials` - List transactions
- `GET /api/artists/:artistId/financials/summary` - Get financial summary
- `POST /api/artists/:artistId/financials` - Create transaction
- `PUT /api/artists/:artistId/financials/:transactionId` - Update transaction
- `DELETE /api/artists/:artistId/financials/:transactionId` - Delete transaction

### Booked Shows
- `GET /api/artists/:artistId/shows` - List shows
- `POST /api/artists/:artistId/shows` - Create show
- `PUT /api/artists/:artistId/shows/:showId` - Update show
- `DELETE /api/artists/:artistId/shows/:showId` - Delete show

## Project Structure

```
pgsmanager/
├── server/
│   ├── db/
│   │   ├── connection.js
│   │   ├── migrate.js
│   │   └── seed.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Artist.js
│   │   ├── CareerMilestone.js
│   │   ├── PostIdea.js
│   │   ├── ScheduledEvent.js
│   │   ├── FinancialTransaction.js
│   │   └── BookedShow.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── artists.js
│   │   ├── milestones.js
│   │   ├── postIdeas.js
│   │   ├── events.js
│   │   ├── financials.js
│   │   └── shows.js
│   └── index.js
├── src/
│   ├── components/
│   │   └── PrivateRoute.jsx
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── ArtistDetailPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── store/
│   │   └── index.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── .env.example
```

## Database Schema

The application uses 7 main tables:
- **users** - Account management
- **artists** - Artist profiles
- **career_milestones** - Career goals and achievements
- **post_ideas** - Social media content planning
- **scheduled_events** - Events and scheduling
- **financial_transactions** - Income and expenses
- **booked_shows** - Show bookings and venue details

## License

MIT

## Support

For issues and feature requests, please open an issue on GitHub.
