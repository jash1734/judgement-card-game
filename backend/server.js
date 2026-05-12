const PORT =
  process.env.PORT || 3001;

server.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `Server running on ${PORT}`
    );
  }
);
const {
  getTrumpSuit,
} = require(
  "./server/trump"
);

const {
  createDeck,
} = require(
  "./server/deck"
);

const {
  calculateScore,
} = require(
  "./server/scoring"
);

const {
  determineTrickWinner,
} = require(
  "./server/trick"
);

const { Server } =
  require("socket.io");

const { rooms } =
  require("./server/rooms");

const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on(
    "join-room",
    ({
  roomCode,
  playerName,
}) => {
      socket.join(roomCode);

      if (!rooms[roomCode]) {
        rooms[roomCode] = {
          players: [],
          hostId: socket.id,
          gameState: null,
        };
      }

      const alreadyExists =
        rooms[
          roomCode
        ].players.some(
          (player) =>
            player.id ===
            socket.id
        );

      if (!alreadyExists) {
        rooms[
  roomCode
].players.push({
  id: socket.id,

  name: playerName,
});
      }
      

      io.to(roomCode).emit(
  "player-joined",
  {
    players:
      rooms[roomCode]
        .players,

    hostId:
      rooms[roomCode]
        .hostId,
  }
);

    }
  );

  socket.on(
  "start-game",
  ({
    roomCode,
    maxRounds,
  }) => {
      if (!rooms[roomCode]) {
        return;
      }
      const totalCardsNeeded =
  maxRounds *
  rooms[roomCode]
    .players.length;

const deckCount =
  Math.ceil(
    totalCardsNeeded / 52
  );
      const deck = createDeck(deckCount);
      const players =
    rooms[roomCode]
    .players.map(
      (
        player,
        index
      ) => ({
        ...player,

        hand: deck.slice(
          index,
          index + 1
        ),

        tricksWon: 0,

        score: 0,
      })
    );

      rooms[roomCode].gameState = {
  players,

  bids: {},

  currentBidderIndex: 0,

  phase: "bidding",

  playedCards: [],

  currentPlayerIndex: 0,

  leadSuit: null,

  currentRound: 1,

  trumpSuit:
    getTrumpSuit(1),

  winner: null,

  startingBidderIndex: 0,

  bidsPlaced: 0,

  maxRounds,
};

      io.to(roomCode).emit(
  "game-state-updated",
  rooms[roomCode]
    .gameState
);

io.to(roomCode).emit(
  "game-started"
);

    }
  );

  socket.on(
  "restart-game",
  ({
    roomCode,
    maxRounds,
  }) => {

    if (!rooms[roomCode]) {
      return;
    }

    const totalCardsNeeded =
      maxRounds *
      rooms[roomCode]
        .players.length;

    const deckCount =
      Math.ceil(
        totalCardsNeeded / 52
      );

    const deck =
      createDeck(deckCount);

    const players =
      rooms[roomCode]
        .players.map(
          (
            player,
            index
          ) => ({
            ...player,

            hand: deck.slice(
              index,
              index + 1
            ),

            tricksWon: 0,

            score: 0,

            bid: undefined,
          })
        );

    rooms[roomCode]
      .gameState = {

      players,

      bids: {},

      bidsPlaced: 0,

      currentBidderIndex: 0,

      startingBidderIndex: 0,

      phase: "bidding",

      playedCards: [],

      currentPlayerIndex: 0,

      leadSuit: null,

      currentRound: 1,

      trumpSuit:
        getTrumpSuit(1),

      winner: null,

      maxRounds,
    };

    io.to(roomCode).emit(
      "game-state-updated",
      rooms[roomCode]
        .gameState
    );
  }
);

  socket.on(
  "place-bid",
  ({ roomCode, bid }) => {
    if (!rooms[roomCode]) {
      return;
    }

    const gameState =
      rooms[roomCode]
        .gameState;

    const currentBidder =
      gameState.players[
        gameState
          .currentBidderIndex
      ];

    if (
      currentBidder.id !==
      socket.id
    ) {
      return;
    }

    gameState.bids[
      socket.id
    ] = bid;

    gameState.bidsPlaced += 1;

    gameState.players =
      gameState.players.map(
        (player) => {
          if (
            player.id !==
            socket.id
          ) {
            return player;
          }

          return {
            ...player,
            bid,
          };
        }
      );

    gameState.currentBidderIndex =
  (
    gameState
      .currentBidderIndex +
    1
  ) %
  gameState.players.length;

    if (
  gameState.bidsPlaced ===
  gameState.players.length
) {
      gameState.phase =
        "playing";

      gameState.currentPlayerIndex =
  gameState
    .startingBidderIndex;
    }

    io.to(roomCode).emit(
      "game-state-updated",
      gameState
    );

  }
);

  socket.on(
  "play-card",
  ({
    roomCode,
    card,
  }) => {

    if (!rooms[roomCode]) {
      return;
    }

    const gameState =
      rooms[roomCode]
        .gameState;

    const alreadyPlayed =
      gameState.playedCards.some(
        (played) =>
          played.playerId ===
          socket.id
      );

    if (alreadyPlayed) {
      return;
    }

    const currentPlayer =
      gameState.players[
        gameState
          .currentPlayerIndex
      ];

    if (
      currentPlayer.id !==
      socket.id
    ) {
      return;
    }

    const player =
      gameState.players.find(
        (player) =>
          player.id ===
          socket.id
      );

    if (!player) {
      return;
    }

    const hasCard =
      player.hand.some(
        (c) =>
          c.suit ===
            card.suit &&
          c.value ===
            card.value
      );

    if (!hasCard) {
      return;
    }

    // FOLLOW SUIT CHECK
    if (
      gameState.leadSuit
    ) {

      const hasLeadSuit =
        player.hand.some(
          (c) =>
            c.suit ===
            gameState.leadSuit
        );

      if (
        hasLeadSuit &&
        card.suit !==
          gameState.leadSuit
      ) {
        return;
      }
    }

    // REMOVE CARD FROM HAND
    player.hand =
      player.hand.filter(
        (c) =>
          !(
            c.suit ===
              card.suit &&
            c.value ===
              card.value
          )
      );

    // ADD TO TABLE
    gameState.playedCards.push({
      playerId:
        socket.id,

      card,
    });

    // FIRST CARD = LEAD SUIT
    if (
      gameState.playedCards
        .length === 1
    ) {
      gameState.leadSuit =
        card.suit;
    }

    // ALL PLAYERS PLAYED
    if (
      gameState.playedCards
        .length ===
      gameState.players.length
    ) {

      const winnerId =
        determineTrickWinner(
          gameState.playedCards,
          gameState.leadSuit,
          gameState.trumpSuit
        );

      const winnerIndex =
        gameState.players.findIndex(
          (player) =>
            player.id ===
            winnerId
        );

      gameState.players =
        gameState.players.map(
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

      // SHOW WINNER TEMPORARILY
      gameState.winner =
        winnerId;

      io.to(roomCode).emit(
        "game-state-updated",
        gameState
      );

      // DELAY BEFORE CLEARING TABLE
      setTimeout(() => {

        gameState.currentPlayerIndex =
          winnerIndex;

        gameState.playedCards =
          [];

        gameState.leadSuit =
          null;

        gameState.winner =
          null;

        const roundFinished =
          gameState.players.every(
            (player) =>
              player.hand
                .length === 0
          );

        // ROUND OVER
        if (roundFinished) {

          gameState.players =
            gameState.players.map(
              (player) => ({
                ...player,

                score:
                  calculateScore(
                    player
                  ),

                tricksWon: 0,

                bid: undefined,
              })
            );

          // GAME OVER
          if (
            gameState.currentRound >=
            gameState.maxRounds
          ) {

            let winner =
              gameState.players[0];

            for (const player of gameState.players) {

              if (
                player.score >
                winner.score
              ) {
                winner =
                  player;
              }
            }

            gameState.phase =
              "gameOver";

            gameState.winner =
              winner.name;

            io.to(roomCode).emit(
              "game-state-updated",
              gameState
            );

            return;
          }

          // NEXT ROUND
          gameState.currentRound +=
            1;

          gameState.trumpSuit =
            getTrumpSuit(
              gameState.currentRound
            );

          const totalCardsNeeded =
            gameState.maxRounds *
            gameState.players.length;

          const deckCount =
            Math.ceil(
              totalCardsNeeded / 52
            );

          const deck =
            createDeck(
              deckCount
            );

          gameState.players =
            gameState.players.map(
              (
                player,
                index
              ) => ({
                ...player,

                hand: deck.slice(
                  index *
                    gameState.currentRound,

                  (index + 1) *
                    gameState.currentRound
                ),
              })
            );

          gameState.bids = {};

          gameState.bidsPlaced =
            0;

          gameState.phase =
            "bidding";

          gameState.startingBidderIndex =
            (
              gameState.startingBidderIndex +
              1
            ) %
            gameState.players.length;

          gameState.currentBidderIndex =
            gameState.startingBidderIndex;
        }

        io.to(roomCode).emit(
          "game-state-updated",
          gameState
        );

      }, 1500);

      return;
    }

    // NORMAL TURN FLOW
    gameState.currentPlayerIndex =
      (
        gameState
          .currentPlayerIndex +
        1
      ) %
      gameState.players.length;

    io.to(roomCode).emit(
      "game-state-updated",
      gameState
    );

  }
);

  socket.on("disconnect", () => {

  for (const roomCode in rooms) {
    rooms[roomCode].players =
      rooms[
        roomCode
      ].players.filter(
        (player) =>
          player.id !==
          socket.id
      );

    io.to(roomCode).emit(
      "player-joined",
      {
        players:
          rooms[roomCode]
            .players,

        hostId:
          rooms[roomCode]
            .hostId,
      }
    );

    socket.on(
  "leave-room",
  (roomCode) => {

    if (!rooms[roomCode]) {
      return;
    }

    rooms[roomCode].players =
      rooms[
        roomCode
      ].players.filter(
        (player) =>
          player.id !==
          socket.id
      );

    // DELETE ROOM IF EMPTY
    if (
      rooms[roomCode]
        .players.length === 0
    ) {
      delete rooms[
        roomCode
      ];

      return;
    }

    // NEW HOST IF HOST LEFT
    if (
      rooms[roomCode]
        .hostId === socket.id
    ) {
      rooms[roomCode].hostId =
        rooms[
          roomCode
        ].players[0].id;
    }

    io.to(roomCode).emit(
      "player-joined",
      {
        players:
          rooms[roomCode]
            .players,

        hostId:
          rooms[roomCode]
            .hostId,
      }
    );

    socket.leave(roomCode);

  }
);
  }
});
});