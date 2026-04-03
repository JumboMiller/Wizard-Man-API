# Wizard-Man

A browser-based Pac-Man style game with a global leaderboard. Players collect coins across 9 levels, then submit their score tied to a Twitter handle and Bitcoin wallet address.

The project is split into three packages inside this monorepo:

| Package | Role |
|---|---|
| `pacman-wizards/` | Vanilla JS game (HTML5 Canvas) |
| `pacman-ladder/` | REST API — stores and serves scores (Node/Express/MySQL) |
| `wizard-man-ladder-front/` | Leaderboard UI (React + TypeScript) |

---

## Features

- 9 hand-crafted tile maps with increasing difficulty
- Enemy AI and power-dot mechanics
- Score persisted via POST on game over
- Leaderboard sorted by highest score
- Score update logic: only overwrites if the new score is higher

---

## Tech Stack

| Layer | Technology |
|---|---|
| Game | Vanilla JavaScript, HTML5 Canvas |
| API | Node.js, Express 4, Sequelize 6 |
| Database | MySQL |
| Leaderboard UI | React 18, TypeScript, Axios |
| Process manager | PM2 |

---

## Getting Started

### Prerequisites

- Node.js ≥ 16
- MySQL server running locally

### Install

Each package manages its own dependencies.

```bash
# API
cd pacman-ladder
npm install

# Leaderboard frontend
cd wizard-man-ladder-front
npm install
```

The game (`pacman-wizards/`) has no build step — serve it statically.

### Database setup

Create a MySQL database named `wizardman`. The API uses Sequelize to auto-sync the `users` table on first start.

```sql
CREATE DATABASE wizardman;
```

### Environment / Configuration

The API currently reads database credentials directly from `pacman-ladder/index.js`. Edit these constants before running:

| Constant | Default | Description |
|---|---|---|
| `DB_NAME` | `wizardman` | MySQL database name |
| `USER_NAME` | `root` | MySQL user |
| `PASSWORD` | `''` | MySQL password |
| `PORT` | `4000` | API listening port |

> **Note:** Move these to a `.env` file for any non-local deployment.

---

## Usage

### Run the API

```bash
cd pacman-ladder

# Development (auto-reload)
npm run dev

# Production
npm start
```

The API listens on port `4000` by default.

#### Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/ladder` | Returns all scores |
| `POST` | `/ladder` | Submit or update a score |

`POST /ladder` body:

```json
{
  "Twitter": "@handle",
  "BitCoinWallet": "walletAddress",
  "Score": 420
}
```

If the Twitter + wallet pair already exists, the score is updated only when the new value is higher.

### Run the leaderboard frontend

```bash
cd wizard-man-ladder-front
npm start        # development server on http://localhost:3000
npm run build    # production build → /build
```

The frontend fetches scores from `https://wizard-man.space/ladder`. Update the URL in `src/App.tsx` to point to your own API instance.

### Serve the game

`pacman-wizards/` is a static site. Serve `index.html` with any HTTP server:

```bash
npx serve pacman-wizards
```

The game posts scores to `https://wizard-man.space/ladder`. Update the URL in `src/Game.js` before self-hosting.

---

## Project Structure

```
wizard-man-api/
├── pacman-ladder/          # Express API
│   └── index.js            # Routes, Sequelize models, DB connection
├── pacman-wizards/         # Browser game
│   ├── index.html
│   ├── style.css
│   └── src/
│       ├── Game.js         # Game loop, input, level management
│       ├── TileMap.js      # Map rendering and tile logic
│       ├── Pacman.js       # Player movement and animation
│       ├── Enemy.js        # Enemy AI
│       └── MovingDirection.js
└── wizard-man-ladder-front/ # Leaderboard React app
    └── src/
        ├── App.tsx         # Fetches scores, sorts by highest
        ├── LadderList.tsx  # Renders the ranked list
        ├── LadderItem.tsx  # Single row: rank, Twitter, wallet, score
        └── IUser.ts        # Score entry type definition
```

---

## Scripts

### `pacman-ladder`

| Command | Description |
|---|---|
| `npm start` | Start with Node |
| `npm run dev` | Start with Nodemon (auto-reload) |

### `wizard-man-ladder-front`

| Command | Description |
|---|---|
| `npm start` | Development server |
| `npm run build` | Production build |
| `npm test` | Run tests |

---

## Deployment

The live game is hosted at `https://wizard-man.site/`, the leaderboard at `https://ladder.wizard-man.site/`, and the API at `https://wizard-man.space/`.

For self-hosting:

1. Deploy the API with PM2:
   ```bash
   cd pacman-ladder
   npx pm2 start index.js --name wizard-man-api
   ```
2. Build and serve the leaderboard frontend as a static site.
3. Host `pacman-wizards/` as a static site behind HTTPS (required for the `fetch` call on game over).
4. Update the hardcoded API URLs in `pacman-wizards/src/Game.js` and `wizard-man-ladder-front/src/App.tsx`.

---

## License

ISC
