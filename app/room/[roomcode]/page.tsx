"use client";

import {
  useEffect,
  useState,
} from "react";

import { useParams, useSearchParams }
from "next/navigation";

import { useGameStore }
from "@/store/gameStore";

import GameBoard
from "@/components/game/GameBoard";

import PlayerList
from "@/components/lobby/PlayerList";

import { socket }
from "@/socket/client";

export default function RoomPage() {
  const [connected, setConnected] =
  useState(false);

  const searchParams =
  useSearchParams();

  const [maxRounds, setMaxRounds] =
  useState(7);

const playerName =
  searchParams.get("name") || "";
  const params = useParams();
  
  const roomCode = Array.isArray(
  params.roomcode
  )
  ? params.roomcode[0]
  : params.roomcode;

  const [players, setPlayers] =
  useState<
    {
      id: string;
      name: string;
    }[]
  >([]);

  const [gameStarted, setGameStarted] =
    useState(false);

  const [hostId, setHostId] =
    useState("");

  const [bids, setBids] =
    useState<
      Record<string, number>
    >({});

  const initializeGame =
    useGameStore(
      (state) =>
        state.initializeGame
    );
  
  const isHost =
  connected &&
  socket.id === hostId;

  const phase =
  useGameStore(
    (state) =>
      state.phase
  );

  useEffect(() => {
    if (!roomCode) {
      return;
    }
    socket.emit(
      "join-room",
      {
        roomCode,
        playerName,
      }
    );

    function handleConnect() {
      setConnected(true);
    }

    socket.on(
      "connect",
      handleConnect
    );

    function handlePlayers(
  data: {
    players: {
      id: string;
      name: string;
    }[];

    hostId: string;
  }
) {
  setPlayers(
    data.players
  );

  setHostId(
    data.hostId
  );
}

    function handleGameStarted() {
      setGameStarted(true);
    }

    socket.on(
      "player-joined",
      handlePlayers
    );

    socket.on(
      "game-started",
      handleGameStarted
    );

    socket.on(
      "bids-updated",
      (updatedBids) => {
        setBids(updatedBids);
      }
    );

    socket.on(
  "game-state-updated",
  (gameState) => {
    setBids(
      gameState.bids
    );
    useGameStore
  .setState({
    players:
      gameState.players,
  });

  useGameStore
  .getState()
  .setBidsPlaced(
    gameState
      .bidsPlaced
  );

  useGameStore
  .getState()
  .setWinner(
    gameState.winner
  );

  useGameStore
  .getState()
  .setCurrentRound(
    gameState
      .currentRound
  );

useGameStore
  .getState()
  .setTrumpSuit(
    gameState
      .trumpSuit
  );

    useGameStore
      .getState()
      .setCurrentBidderIndex(
        gameState
          .currentBidderIndex
      );
      useGameStore
  .getState()
  .setPhase(
    gameState.phase
  );
  useGameStore
  .getState()
  .setPlayedCards(
    gameState.playedCards || []
  );

useGameStore
  .getState()
  .setCurrentPlayerIndex(
    gameState
      .currentPlayerIndex
  );

useGameStore
  .getState()
  .setLeadSuit(
    gameState
      .leadSuit
  );
  }
);

    return () => {
      socket.off(
        "player-joined"
      );

      socket.off(
        "game-started"
      );

      socket.off(
        "bids-updated"
      );

      socket.off(
  "game-state-updated"
);

  socket.off(
  "connect",
  handleConnect
);

    };
  }, [
    roomCode,
    initializeGame,
  ]);

  return (
    <main
  className="
    min-h-screen
    relative
    overflow-hidden
    text-white
  "
>
  {/* Background */}
  <div
    className="
      fixed
      inset-0
      bg-[url('/images/background.png')]
      bg-cover
      bg-center
      bg-no-repeat
      -z-20
    "
  />

  {/* Dark Overlay */}
  <div
    className="
      absolute
      inset-0
      bg-black/75
      backdrop-blur-[2px]
      -z-10
    "
  />

  {/* Content */}
  <div
    className="
      relative
      z-10
      min-h-screen
      p-8
    "
  >
    {/* Header */}
    <div
      className="
        flex
        justify-between
        items-center
        mb-8
      "
    >
      <h1
        className="
          text-4xl
          text-yellow-400
          drop-shadow-lg
        "
      >
        RoomCode :
        <span
          className="
            font-sans
            font-extrabold
            text-yellow-400
            ml-2
          "
        >
          {roomCode}
        </span>
      </h1>
    </div>

    {/* Main Layout */}
    <div
      className="
        flex
        gap-6
        min-h-[80vh]
      "
    >
      {/* LEFT SIDEBAR */}
      <div
        className="
          min-w-[22%]
          bg-black/45
          border
          border-white/10
          rounded-3xl
          backdrop-blur-md
          shadow-2xl
          p-5
          h-[80vh]
          overflow-auto
          custom-scrollbar
        "
      >
        <PlayerList
          players={players}
        />
      </div>

      {/* RIGHT CONTENT */}
      <div
        className="
          flex-1
          bg-black/40
          border
          border-white/10
          rounded-3xl
          backdrop-blur-md
          shadow-2xl
          p-7
          overflow-y-auto
        "
      >
        {/* START CONTROLS */}
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-5
            mb-8
          "
        >
          {isHost &&
            (!gameStarted ||
              phase ===
                "gameOver") && (
              <div className="mb-2">
                <label className="text-3xl">Number of Rounds : </label>
                <input
                  type="text"
                  min={1}
                  value={
                    maxRounds
                  }
                  onChange={(
                    e
                  ) =>
                    setMaxRounds(
                      parseInt(
                        e.target
                          .value
                      ) || 0
                    )
                  }
                  placeholder="Enter rounds"
                  className="
                    px-5
                    py-4
                    rounded-2xl
                    bg-white/90
                    text-black
                    text-lg
                    outline-none
                    w-64
                    focus:ring-4
                    focus:ring-yellow-400
                  "
                />
              </div>
            )}

          {isHost &&
            !gameStarted &&(
              <>
                <button
                  onClick={() =>
                    socket.emit(
                      "start-game",
                      {
                        roomCode,
                        maxRounds,
                      }
                    )
                  }
                  className="
                    bg-yellow-500
                    hover:bg-yellow-600
                    text-black
                    px-8
                    py-4
                    rounded-2xl
                    font-bold
                    text-lg
                    shadow-lg
                    transition
                  "
                >
                  Start Game
                </button>
              </>
            )}

          {phase ===
            "gameOver" &&
            isHost && (
              <button
                onClick={() =>
                  socket.emit(
                    "restart-game",
                    {
                      roomCode,
                      maxRounds,
                    }
                  )
                }
                className="
                  bg-yellow-500
                  hover:bg-yellow-600
                  text-black
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  text-lg
                  shadow-lg
                  transition
                "
              >
                Restart Game
              </button>
            )}

          {!gameStarted && (
            <div
              className="
                bg-black/40
                border
                border-white/10
                p-6
                rounded-3xl
                text-2xl
                text-center
                shadow-xl
                max-w-2xl
              "
            >
              {isHost
                ? "Players are waiting for you to start the game"
                : "Waiting for host to start the game"}
            </div>
          )}
        </div>

        {/* PREDICTIONS */}
        {gameStarted &&
          phase !==
            "gameOver" && (
            <div
              className="
                bg-black/30
                border
                border-white/10
                p-5
                rounded-3xl
                mb-6
              "
            >
              <h2
                className="
                  text-2xl
                  mb-4
                  text-yellow-300
                "
              >
                All Predictions
              </h2>

              <div
  className="
    flex
    flex-wrap
    gap-3
    max-h-40
    overflow-y-auto
    pr-2
  "
>
  {Object.entries(
    bids
  ).map(
    ([
      playerId,
      bid,
    ]) => {
      const player =
        players.find(
          (
            player
          ) =>
            player.id ===
            playerId
        );

      return (
        <div
          key={
            playerId
          }
          className="
            bg-white/10
            border
            border-white/10
            px-5
            py-3
            rounded-2xl
            backdrop-blur-md
            whitespace-nowrap
            shadow-lg
          "
        >
          <span
            className="
              text-white
              font-semibold
            "
          >
            {player?.name}
          </span>

          <span className="mx-2">
            :
          </span>

          <span
            className="
              text-white
              font-bold
            "
          >
            {bid}
          </span>
        </div>
      );
    }
  )}
</div>
            </div>
          )}

        {/* GAME BOARD */}
        {gameStarted ? (
          <GameBoard
            bids={bids}
            myId={
              socket.id || ""
            }
          />
        ) : null}
      </div>
    </div>
  </div>
</main>
  );
}