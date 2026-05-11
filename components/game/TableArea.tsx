import { Card as CardType }
from "@/types/game";

import Card from "./Card";

type PlayedCard = {
  playerId: string;
  card: CardType;
};

type Player = {
  id: string;
  name: string;
};

type Props = {
  playedCards: PlayedCard[];

  players: Player[];
};

export default function TableArea({
  playedCards,
  players,
}: Props) {
  return (
    <div
      className="
        w-full
        min-h-[320px]
        max-h-[500px]
        overflow-y-auto
        rounded-3xl
        border
        border-yellow-500/20
        bg-black/40
        backdrop-blur-md
        shadow-2xl
        p-6
      "
    >
      <div
        className="
          flex
          flex-wrap
          gap-8
          justify-center
          items-start
        "
      >
        {players.map(
          (player) => {
            const played =
              playedCards.find(
                (
                  playedCard
                ) =>
                  playedCard.playerId ===
                  player.id
              );

            return (
              <div
                key={player.id}
                className="
                  flex
                  flex-col
                  items-center
                  gap-3
                  min-w-[120px]
                "
              >
                {/* Player Name */}
                <div
                  className="
                    px-4
                    py-2
                    rounded-2xl
                    bg-white/10
                    border
                    border-white/10
                    text-white
                    font-semibold
                    text-center
                    shadow-lg
                    backdrop-blur-md
                  "
                >
                  {player.name}
                </div>

                {/* Card */}
                {played ? (
                  <Card
                    card={
                      played.card
                    }
                  />
                ) : (
                  <div
                    className="
                      w-20
                      h-28
                      rounded-2xl
                      border
                      border-dashed
                      border-white/20
                      bg-black/20
                    "
                  />
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}