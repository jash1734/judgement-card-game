"use client";

type Props = {
  players: {
    id: string;
    name: string
  }[];
};

export default function PlayerList({
  players,
}: Props) {
  return (
    <div
      className="
        bg-blue-500
        p-4
        rounded-2xl
      "
    >
      <h2 className="text-2xl mb-4">
        Players
      </h2>

      <div className="space-y-2">
        {players.map((player) => (
          <div
            key={player.id}
            className="
              bg-blue-700
              p-3
              rounded-xl
            "
          >
            {player.name}
          </div>
        ))}
      </div>
    </div>
  );
}