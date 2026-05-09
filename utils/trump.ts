import { Suit } from "@/types/game";

const trumpOrder: Suit[] = [
  "spades",
  "diamonds",
  "clubs",
  "hearts",
];

export function getTrumpSuit(
  round: number
): Suit {
  return trumpOrder[
    (round - 1) % trumpOrder.length
  ];
}