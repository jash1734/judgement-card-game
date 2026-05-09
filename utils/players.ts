import { Player } from "@/types/game";

export function createPlayers(): Player[] {
  return [
    {
      id: "1",
      name: "Player 1",

      hand: [],

      bid: null,

      tricksWon: 0,

      score: 0,
    },

    {
      id: "2",
      name: "Player 2",

      hand: [],

      bid: null,

      tricksWon: 0,

      score: 0,
    },
  ];
}