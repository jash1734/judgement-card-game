const suits = [
  "spades",
  "diamonds",
  "clubs",
  "hearts",
];

function getTrumpSuit(
  round
) {
  return suits[
    (round - 1) % 4
  ];
}

module.exports = {
  getTrumpSuit,
};