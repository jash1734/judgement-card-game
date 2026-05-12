function calculateScore(
  player
) {
  if (
    player.tricksWon ===
    player.bid
  ) {
    return (
      player.score +
      10 +
      player.tricksWon
    );
  }

  return player.score;
}

module.exports = {
  calculateScore,
};