import { create } from "zustand";

import {
  Card,
  GamePhase,
  PlayedCard,
  Player,
  Suit,
} from "@/types/game";

import { createDeck } from "@/utils/deck";
import { createPlayers } from "@/utils/players";
import { getTrumpSuit } from "@/utils/trump";
import { determineTrickWinner } from "@/utils/trick";
import { canPlayCard } from "@/utils/rules";

type GameState = {
  players: Player[];

  currentRound: number;

  maxRounds: number;

  trumpSuit: Suit;

  phase: GamePhase;

  currentPlayerIndex: number;

  currentBidderIndex: number;

  playedCards: PlayedCard[];

  leadSuit?: Suit;

  winner?: string;
  bidsPlaced: number;

setBidsPlaced: (
  count: number
) => void;

  setCurrentRound: (
  round: number
) => void;

setWinner: (
  winner: string
) => void;

setTrumpSuit: (
  suit: Suit
) => void;

  initializeGame: () => void;

  setCurrentBidderIndex: (
  index: number,
  
) => void;

  playCard: (
    playerId: string,
    card: Card
  ) => void;

  placeBid: (
    playerId: string,
    bid: number
  ) => void;

  setPhase: (
    phase: GamePhase
  ) => void;

  setPlayedCards: (
  cards: PlayedCard[]
) => void;

setCurrentPlayerIndex: (
  index: number
) => void;

setLeadSuit: (
  suit?: Suit
) => void;

resetGame: () => void;

};


export const useGameStore =
  create<GameState>((set, get) => ({
    players: [],

    currentRound: 1,

    maxRounds: 7,

    trumpSuit: "spades",

    phase: "waiting",

    currentPlayerIndex: 0,

    currentBidderIndex: 0,

    playedCards: [],

    leadSuit: undefined,

    winner: undefined,

    setPhase: (phase) =>
      set({
        phase,
    }),

    setPlayedCards: (
  cards
) =>
  set({
    playedCards: cards,
  }),

  bidsPlaced: 0,

  setBidsPlaced: (
  count
) =>
  set({
    bidsPlaced: count,
  }),

  setWinner: (
  winner
) =>
  set({
    winner,
  }),

setCurrentPlayerIndex: (
  index
) =>
  set({
    currentPlayerIndex:
      index,
  }),

setLeadSuit: (suit) =>
  set({
    leadSuit: suit,
  }),

  resetGame: () =>
  set({
    players: [],

    currentRound: 1,

    maxRounds: 7,

    trumpSuit: "spades",

    phase: "waiting",

    currentPlayerIndex: 0,

    currentBidderIndex: 0,

    playedCards: [],

    leadSuit: undefined,

    winner: undefined,

    bidsPlaced: 0,
  }),

    setCurrentBidderIndex: (
      index
    ) =>
      set({
      currentBidderIndex:
      index,
    }),

    setCurrentRound: (
  round
) =>
  set({
    currentRound:
      round,
  }),

setTrumpSuit: (
  suit
) =>
  set({
    trumpSuit: suit,
  }),

    initializeGame: () => {
      const deck = createDeck();

      const players = createPlayers();

      const currentRound = 1;

      players.forEach((player, index) => {
        player.hand = deck.slice(
          index * currentRound,
          (index + 1) * currentRound
        );
      });

      set({
        players,

        currentRound,

        trumpSuit:
          getTrumpSuit(currentRound),

        phase: "bidding",

        currentPlayerIndex: 0,

        currentBidderIndex: 0,

        playedCards: [],

        leadSuit: undefined,

        winner: undefined,
      });
    },

    playCard: (playerId, card) => {
      const state = get();

      if (state.phase !== "playing") {
        return;
      }

      const currentPlayer =
        state.players[
          state.currentPlayerIndex
        ];

      if (currentPlayer.id !== playerId) {
        return;
      }

      const player =
        state.players.find(
          (player) =>
            player.id === playerId
        );

      if (!player) {
        return;
      }

      const validMove =
        canPlayCard(
          player.hand,
          card,
          state.leadSuit
        );

      if (!validMove) {
        return;
      }

      const updatedPlayers =
        state.players.map((player) => {
          if (player.id !== playerId) {
            return player;
          }

          return {
            ...player,

            hand: player.hand.filter(
              (c) =>
                !(
                  c.suit === card.suit &&
                  c.value === card.value
                )
            ),
          };
        });

      const updatedPlayedCards = [
        ...state.playedCards,

        {
          playerId,
          card,
        },
      ];

      const nextPlayerIndex =
        (state.currentPlayerIndex + 1) %
        state.players.length;

      set({
        players: updatedPlayers,

        playedCards: updatedPlayedCards,

        currentPlayerIndex:
          nextPlayerIndex,

        leadSuit:
          state.playedCards.length === 0
            ? card.suit
            : state.leadSuit,
      });

      if (
        updatedPlayedCards.length ===
        state.players.length
      ) {
        setTimeout(() => {
          const winnerId =
            determineTrickWinner(
              updatedPlayedCards,
              state.leadSuit ||
                card.suit,
              state.trumpSuit
            );

          const winnerIndex =
            state.players.findIndex(
              (player) =>
                player.id ===
                winnerId
            );

          const updatedPlayersWithTricks =
            updatedPlayers.map(
              (player) => {
                if (
                  player.id !==
                  winnerId
                ) {
                  return player;
                }

                return {
                  ...player,

                  tricksWon:
                    player.tricksWon +
                    1,
                };
              }
            );

          const roundFinished =
            updatedPlayersWithTricks.every(
              (player) =>
                player.hand.length ===
                0
            );

          const playersWithScores =
            updatedPlayersWithTricks.map(
              (player) => {
                const correctBid =
                  player.bid ===
                  player.tricksWon;

                return {
                  ...player,

                  score: correctBid
                    ? player.score +
                      player.tricksWon +
                      1
                    : player.score,
                };
              }
            );

          if (roundFinished) {
            const nextRound =
              state.currentRound + 1;

            const gameFinished =
              nextRound >
              state.maxRounds;

            if (gameFinished) {
              const highestScore =
                Math.max(
                  ...playersWithScores.map(
                    (player) =>
                      player.score
                  )
                );

              const winner =
                playersWithScores.find(
                  (player) =>
                    player.score ===
                    highestScore
                );

              set({
                players:
                  playersWithScores,

                phase: "gameOver",

                winner:
                  winner?.name,
              });

              return;
            }

            const deck =
              createDeck();

            const resetPlayers =
              playersWithScores.map(
                (player, index) => ({
                  ...player,

                  hand: deck.slice(
                    index *
                      nextRound,
                    (index + 1) *
                      nextRound
                  ),

                  bid: null,

                  tricksWon: 0,
                })
              );

            set({
              players: resetPlayers,

              currentRound:
                nextRound,

              trumpSuit:
                getTrumpSuit(
                  nextRound
                ),

              phase: "bidding",

              currentBidderIndex: 0,

              playedCards: [],

              leadSuit:
                undefined,

              currentPlayerIndex:
                winnerIndex,
            });

            return;
          }

          set({
            players:
              updatedPlayersWithTricks,

            playedCards: [],

            leadSuit: undefined,

            currentPlayerIndex:
              winnerIndex,
          });
        }, 1500);
      }
    },

    placeBid: (playerId, bid) => {
      const state = get();

      if (state.phase !== "bidding") {
        return;
      }

      const currentBidder =
        state.players[
          state.currentBidderIndex
        ];

      if (
        currentBidder.id !== playerId
      ) {
        return;
      }

      const updatedPlayers =
        state.players.map((player) => {
          if (player.id !== playerId) {
            return player;
          }

          return {
            ...player,

            bid,
          };
        });

      const nextBidderIndex =
        state.currentBidderIndex + 1;

      const allPlayersBid =
        nextBidderIndex >=
        state.players.length;

      set({
        players: updatedPlayers,

        currentBidderIndex:
          nextBidderIndex,

        phase: allPlayersBid
          ? "playing"
          : "bidding",
      });
    },
  }));