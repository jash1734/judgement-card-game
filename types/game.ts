export type Suit =
  | "spades"
  | "diamonds"
  | "clubs"
  | "hearts";

export type GamePhase =
  | "waiting"
  | "bidding"
  | "playing"
  | "roundEnd"
  | "gameOver";

export type Card = {
  suit: Suit;
  value: number;
};

export type Player = {
  id: string;

  name: string;

  hand: Card[];

  bid: number | null;

  tricksWon: number;

  score: number;
};

export type PlayedCard = {
  playerId: string;

  card: Card;
};