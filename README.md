# Judgement Multiplayer Card Game

A real-time multiplayer trick-taking card game inspired by Judgement/Kachuful, built with modern full-stack web technologies. Players can create private rooms, join friends, predict tricks, play strategically with trump mechanics, and compete in synchronized multiplayer matches online.

---

# Live Demo

Frontend:  
https://judgement-card-game.vercel.app

Backend:  
https://judgement-card-game-7r72.onrender.com

---

# Features

## Real-Time Multiplayer

- Real-time gameplay using Socket.IO
- Create and join private rooms
- Host-controlled lobby system
- Online multiplayer synchronization
- Live room updates
- Shared game state across all players
- Automatic host reassignment
- Restartable matches

---

## Core Gameplay Mechanics

- Trick-taking gameplay
- Rotating prediction order
- Rotating trump suit system
- Follow-suit enforcement
- Trump suit priority logic
- Trick winner calculation
- Dynamic round progression
- Multi-round gameplay support
- Dynamic deck generation
- Multiple deck support for large matches
- Complete score calculation system

---

## Fair & Secure Gameplay

- Server-authoritative game state
- Turn validation
- Card ownership validation
- Prediction validation
- Follow-suit validation
- Anti-cheat synchronization
- Controlled multiplayer event flow

---

# Modern UI / UX Features

- Custom themed card-game interface
- Animated gameplay interactions
- Responsive multiplayer layout
- Mobile landscape support
- Rotate-device overlay for mobile
- Trick winner overlay notifications
- Player join notifications
- Multiplayer sound effects
- Scrollable prediction system
- Dynamic game table layout
- Live score tracking
- Clean room lobby interface
- Styled card table background
- Responsive player areas

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand
- Framer Motion
- Socket.IO Client

---

## Backend

- Node.js
- Express
- Socket.IO

---

# Gameplay Rules

- Players predict how many tricks they will win every round.
- Prediction order rotates each round for fairness.
- Trump suit rotates between:
  - Spades
  - Diamonds
  - Clubs
  - Hearts

---

## Card Rules

- Players must follow lead suit if possible.
- If a player does not have the lead suit, they may play any card.
- Trump cards beat all non-trump cards.
- If no trump card is played, the highest card of the lead suit wins.
- Duplicate cards are supported in multi-deck matches.
- If identical cards are played, the later played card wins.

---

## Dynamic Deck System

Additional decks are automatically added when needed:

```txt
rounds × players > 52
```

This allows scalable multiplayer matches with many rounds and players.

---

# Project Structure

```txt
judgement-card-game/
│
├── app/
├── components/
├── public/
├── socket/
├── store/
├── types/
├── utils/
│
├── backend/
│   ├── server/
│   ├── server.js
│   ├── package.json
│
├── package.json
├── tsconfig.json
├── README.md
```

---

# Installation

## Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
```

---

# Frontend Setup

## Install Frontend Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

# Backend Setup

## Move Into Backend Folder

```bash
cd backend
```

## Install Backend Dependencies

```bash
npm install
```

## Start Backend Server

```bash
node server.js
```

Backend runs on:

```txt
http://localhost:3001
```

---

# Environment Variables

Create:

```txt
.env.local
```

Add:

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

For production:

```env
NEXT_PUBLIC_SOCKET_URL=https://your-backend-url.onrender.com
```

---

# Deployment

## Frontend

Deployed on Vercel.

## Backend

Deployed on Render.

---

# Learning Outcomes

This project strengthened concepts including:

- Real-time multiplayer architecture
- WebSocket communication
- Server-authoritative game logic
- Multiplayer synchronization
- Game engine logic
- Room lifecycle management
- Frontend/backend separation
- Production deployment
- Environment variable management
- Responsive multiplayer UI
- State management using Zustand
- Full-stack application architecture

---

# Future Improvements

- Reconnect handling
- Persistent rooms
- Friend invites
- Spectator mode
- Leaderboards
- Match history
- AI bot players
- More advanced animations
- Player profiles & avatars
- In-game chat

---

# Author

Built by Jash Deshani.