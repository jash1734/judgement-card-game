import { Card as CardType } from "@/types/game";
import Card from "./Card";

type Props = {
  player1Played?: CardType;
  player2Played?: CardType;
};

export default function TableArea({
  player1Played,
  player2Played,
}: Props) {
  return (
    <div
      className="
        h-72
        border-4
        border-dashed
        border-green-600
        rounded-2xl
        bg-green-800
        flex
        items-center
        justify-center
        gap-12
      "
    >
      <div className="flex flex-col items-center gap-2">
        <p className="text-white">
          Player 1
        </p>

        {player1Played ? (
          <Card card={player1Played} />
        ) : (
          <div className="w-20 h-28" />
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-white">
          Player 2
        </p>

        {player2Played ? (
          <Card card={player2Played} />
        ) : (
          <div className="w-20 h-28" />
        )}
      </div>
    </div>
  );
}