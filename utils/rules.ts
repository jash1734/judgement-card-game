import {
  Card,
  Suit,
} from "@/types/game";

export function canPlayCard(
  hand: Card[],
  selectedCard: Card,
  leadSuit?: Suit
) {
  // No lead suit yet
  if (!leadSuit) {
    return true;
  }

  // Same suit always allowed
  if (
    selectedCard.suit === leadSuit
  ) {
    return true;
  }

  // Check if player has lead suit
  const hasLeadSuit = hand.some(
    (card) =>
      card.suit === leadSuit
  );

  // If player has lead suit,
  // off-suit card not allowed
  if (hasLeadSuit) {
    return false;
  }

  return true;
}