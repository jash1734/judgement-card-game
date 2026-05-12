const suits = [
  "spades",
  "hearts",
  "diamonds",
  "clubs",
];

const values = [
  2, 3, 4, 5,
  6, 7, 8, 9,
  10, 11, 12,
  13, 14,
];

function createDeck(
  deckCount = 1
) {
  const deck = [];

  for (
    let d = 0;
    d < deckCount;
    d++
  ) {
    for (const suit of suits) {
      for (const value of values) {
        deck.push({
          suit,
          value,
        });
      }
    }
  }

  return deck.sort(
    () => Math.random() - 0.5
  );
}

module.exports = {
  createDeck,
};