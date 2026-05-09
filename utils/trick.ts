import {
  PlayedCard,
  Suit,
} from "@/types/game";

export function determineTrickWinner(
  playedCards: PlayedCard[],
  leadSuit: Suit,
  trumpSuit: Suit
) {
  let winningCard = playedCards[0];

  for (const played of playedCards) {
    const current =
      winningCard.card;

    const challenger =
      played.card;

    // Trump beats non-trump
    if (
      challenger.suit === trumpSuit &&
      current.suit !== trumpSuit
    ) {
      winningCard = played;

      continue;
    }

    // Same suit comparison
    if (
      challenger.suit === current.suit &&
      challenger.value > current.value
    ) {
      winningCard = played;

      continue;
    }

    // Lead suit beats off-suit
    if (
      current.suit !== trumpSuit &&
      challenger.suit === leadSuit &&
      current.suit !== leadSuit
    ) {
      winningCard = played;
    }
  }

  return winningCard.playerId;
}