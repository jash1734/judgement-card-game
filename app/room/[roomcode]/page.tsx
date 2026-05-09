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
        bg-green-900
        text-white
        p-8
      "
    >
      <h1 className="text-5xl font-bold mb-8">
        Room: {roomCode}
      </h1>

      <PlayerList players={players} />
      {isHost && (
  <div className="mb-4">
    <input
      type="text"
      min={1}
      value={maxRounds}
      onChange={(e) =>
  setMaxRounds(
    parseInt(
      e.target.value
    ) || 0
  )
}
      placeholder="Enter rounds"
      className="
        px-4
        py-3
        rounded-xl
        text-black
        w-48
      "
    />
  </div>
)}
      {isHost && !gameStarted &&(
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
          bg-blue-500
          hover:bg-blue-600
          text-white
          px-6
          py-3
          rounded-xl
          font-bold
          mb-8
        "
      >
        Start Game
      </button>
      </>
      )}
  {gameStarted && (
      <div
        className="
          bg-black/30
          p-4
          rounded-xl
          mb-6
        "
      >
        <h2 className="text-2xl mb-2">
          All Predictions
        </h2>

        <div className="space-y-2">
  {Object.entries(
    bids
  ).map(
    ([playerId, bid]) => {
      const player =
        players.find(
          (player) =>
            player.id ===
            playerId
        );

      return (
        <div
          key={playerId}
          className="
            bg-white/10
            p-3
            rounded-lg
          "
        >
          {player?.name}: {bid}
        </div>
      );
    }
    
  )}
</div>
      </div>
      )}
      {phase === "gameOver" &&
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
        px-6
        py-3
        rounded-xl
        font-bold
        mb-6
      "
    >
      Restart Game
    </button>
)}

      {gameStarted ? (
        <GameBoard
          bids={bids}
           myId={
    socket.id || ""
  }
        />
      ) : (
        <div
          className="
            bg-green-800
            p-6
            rounded-2xl
            text-2xl
          "
        >
          Waiting for host to
          start game...
        </div>
      )}

    </main>
  );
}