# Judgement Multiplayer Card Game

A real-time multiplayer trick-taking card game built with modern web technologies. Players can create rooms, join with friends, predict number of hands they will win, play cards strategically, and compete across multiple rounds with synchronized gameplay.

---

## Features

### Multiplayer Gameplay

* Real-time multiplayer using Socket.IO
* Room creation and joining system
* Host-controlled game start and restart
* Live synchronized gameplay across all connected players

### Game Mechanics

* Rotating prediction order every round
* Rotating trump suit system
* Follow-suit enforcement
* Trump priority logic
* Trick winner calculation
* Multi-round gameplay
* Dynamic deck generation for large games
* Multiple deck support when required
* Score calculation system
* Restartable matches

### Fair Gameplay Rules

* Server-authoritative game state
* Turn validation
* Card ownership validation
* Secure prediction validation
* Follow-suit validation on server
* Anti-cheat gameplay synchronization

### UI Features

* Responsive card table layout
* Hidden opponent cards
* Animated card interactions using Framer Motion
* Shared predictions and score tracking
* Turn-based interaction system

---

# Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Zustand

## Backend

* Node.js
* Express
* Socket.IO

---

# Gameplay Rules

* Players predict how many hands they will win each round.
* Prediction order rotates every round for fairness.
* Trump suit rotates between:

  * Spades
  * Diamonds
  * Clubs
  * Hearts
* Players must follow suit if possible.
* Trump cards beat all non-trump cards.
* If no trump is played, highest lead suit card wins.
* Multiple decks are automatically added when required based on:

```txt
number of rounds × players > 52
```

* Duplicate cards are supported in multi-deck games.
* If equal cards are played, the later played card wins.

---

# Project Structure

```txt
judgement/
│
├── app/
├── components/
├── server/
├── socket/
├── store/
├── types/
├── utils/
├── public/
│
├── server.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
```

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

## Run Socket Server

```bash
npm run socket
```

---

# Learning Outcomes

This project helped strengthen concepts including:

* Real-time multiplayer architecture
* WebSocket communication
* Server-authoritative game logic
* State synchronization
* Game engine logic
* Scalable room management
* Frontend/backend integration
* Advanced React state management

---

# Author

Built by Jash Deshani.