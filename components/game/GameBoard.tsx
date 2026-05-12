"use client";

import PlayerArea
from "@/components/game/PlayerArea";

import TableArea
from "@/components/game/TableArea";

import { useGameStore }
from "@/store/gameStore";

import { socket }
from "@/socket/client";
import { useEffect } from "react";

type Props = {
  bids: Record<
    string,
    number
  >;
  myId: string;
};

export default function GameBoard({
  bids,
  myId,
}: Props) {
  const {
    players,

    currentRound,

    trumpSuit,

    currentPlayerIndex,

    currentBidderIndex,

    playedCards,

    phase,

    winner,

    leadSuit,

    playCard,

    placeBid,
    bidsPlaced,
  } = useGameStore();
  const isMyBidTurn =
  players[
    currentBidderIndex
  ]?.id === myId;
  
  useEffect(() => {
  if (
    playedCards.length > 0
  ) {
    const audio =
      new Audio(
        "/sounds/throwcard.mp3"
      );

    audio.volume = 0.4;

    audio.play().catch(
      console.log
    );
  }
}, [playedCards.length]);

  return (
    <div>
      <div className="flex justify-center gap-6 mb-8">
        <div className="bg-green-800 px-6 py-3 rounded-xl text-white">
          Round : {currentRound}
        </div>

        <div className="bg-red-500 px-6 py-3 rounded-xl text-white">
          Trump : {trumpSuit.toUpperCase()}
        </div>

        {/* <div className="bg-blue-500 px-6 py-3 rounded-xl text-white">
          Phase: {phase}
        </div> */}
      </div>

      {phase === "gameOver" && (
        <div className="mb-8 text-center">
          <div
            className="
              inline-block
              bg-yellow-400
              text-black
              px-8
              py-4
              rounded-2xl
              text-3xl
              font-bold
            "
          >
            {winner} Wins The Game!
          </div>
        </div>
      )}

      {phase === "bidding" && (
  <div className="mb-8 text-center">
    <h2 className="text-white text-2xl mb-4">
      {
        players[
          currentBidderIndex
        ]?.name
      }{" "}
      is predicting
    </h2>

    {isMyBidTurn && (
      <div className="flex justify-center gap-3">
        {Array.from({
          length:
            currentRound + 1,
        }).map((_, index) => {
          const isLastBidder =
  bidsPlaced ===
  players.length - 1;

          const totalPreviousBids =
            Object.values(
              bids
            ).reduce(
              (sum, bid) =>
                sum + bid,
              0
            );

          const invalidBid =
            isLastBidder &&
            totalPreviousBids +
              index ===
              currentRound;

          return (
            <button
              key={index}
              disabled={
                invalidBid
              }
              onClick={() => {
                const roomCode =
                  window.location.pathname.split(
                    "/"
                  )[2];

                socket.emit(
                  "place-bid",
                  {
                    roomCode,
                    bid: index,
                  }
                );
              }}
              className={`
                px-4
                py-2
                rounded-lg
                text-white

                ${
                  invalidBid
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }
              `}
            >
              {index}
            </button>
          );
        })}
      </div>
    )}
  </div>
)}

      <TableArea
        playedCards={playedCards}
        players={players}
      />

      <div className="space-y-8 mt-8">
        {players
  .filter(
    
    (player) =>
      player.id === myId
    
  )
  .map(
    (player, index) => (
      <PlayerArea
        key={player.id}
        playerName={
          player.name
        }
        cards={player.hand}
        tricksWon={
          player.tricksWon
        }
        bid={player.bid}
        score={player.score}
        leadSuit={leadSuit}
        isCurrentPlayer={
          players[
            currentPlayerIndex
          ]?.id === myId
        }
        disabled={
          phase !==
            "playing" ||

          players[
            currentPlayerIndex
          ]?.id !== myId
        }
        onPlayCard={(
          card
        ) => {
          const roomCode =
            window.location.pathname.split(
              "/"
            )[2];

          socket.emit(
            "play-card",
            {
              roomCode,
              card,
            }
          );
        }}
      />
    )
  )}
      </div>
    </div>
  );
}