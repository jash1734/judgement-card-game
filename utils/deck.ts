import { Card, Suit } from "@/types/game";

const suits: Suit[] = [
  "hearts",
  "diamonds",
  "clubs",
  "spades",
];

export function createDeck(): Card[] {
  const deck: Card[] = [];

  for (const suit of suits) {
    for (let value = 1; value <= 13; value++) {
      deck.push({
        suit,
        value,
      });
    }
  }

  return shuffleDeck(deck);
}

function shuffleDeck(deck: Card[]) {
  const shuffled = [...deck];

  for (
    let i = shuffled.length - 1;
    i > 0;
    i--
  ) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
}