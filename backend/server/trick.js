function determineTrickWinner(
  playedCards,
  leadSuit,
  trumpSuit
) {
  let winningCard =
    playedCards[0];

  for (
    let i = 1;
    i < playedCards.length;
    i++
  ) {
    const challenger =
      playedCards[i];

    const current =
      winningCard;

    const challengerCard =
      challenger.card;

    const currentCard =
      current.card;

    const challengerTrump =
      challengerCard.suit ===
      trumpSuit;

    const currentTrump =
      currentCard.suit ===
      trumpSuit;

    // Trump beats non-trump
    if (
      challengerTrump &&
      !currentTrump
    ) {
      winningCard =
        challenger;

      continue;
    }

    // Non-trump loses to trump
    if (
      !challengerTrump &&
      currentTrump
    ) {
      continue;
    }

    // Both trump
    if (
      challengerTrump &&
      currentTrump
    ) {
      if (
        challengerCard.value >=
        currentCard.value
      ) {
        winningCard =
          challenger;
      }

      continue;
    }

    const challengerLead =
      challengerCard.suit ===
      leadSuit;

    const currentLead =
      currentCard.suit ===
      leadSuit;

    // Lead suit beats off-suit
    if (
      challengerLead &&
      !currentLead
    ) {
      winningCard =
        challenger;

      continue;
    }

    // Off-suit loses
    if (
      !challengerLead &&
      currentLead
    ) {
      continue;
    }

    // Both lead suit
    if (
      challengerLead &&
      currentLead
    ) {
      if (
        challengerCard.value >=
        currentCard.value
      ) {
        winningCard =
          challenger;
      }
    }
  }

  return winningCard
    .playerId;
}

module.exports = {
  determineTrickWinner,
};