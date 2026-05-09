import { Card as CardType, Suit } from "@/types/game";
import Card from "./Card";
import { canPlayCard } from "@/utils/rules";
type Props = {
  playerName: string;
  cards: CardType[];
  isCurrentPlayer?: boolean;
  disabled?: boolean,
  hideCards?: boolean;
  tricksWon?: number;
  bid?: number | null;
  leadSuit?: Suit;
  score?: number;
  onPlayCard?: (card: CardType) => void;
  showCards?: boolean;
};

export default function PlayerArea({
  playerName,
  cards,
  isCurrentPlayer,
  disabled,
  hideCards,
  tricksWon,
  onPlayCard,
  bid,
  leadSuit,
  score,
  showCards = true,
}: Props) {
  return (
    <div
      className={`
        p-4
        rounded-xl
        ${
          isCurrentPlayer
            ? "bg-green-700"
            : "bg-green-800"
        }
      `}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-bold">
          {playerName}
        </h2>
        <p className="text-white">
          Tricks Won : {tricksWon}
        </p>
        <p className="text-white">
          Prediction : {bid ?? "-"}
        </p>
        <p className="text-white">
          Score : {score}
        </p>
        {isCurrentPlayer && (
          <span className="text-yellow-300 font-bold">
            Your Turn
          </span>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {cards.map((card, index) => (
          <Card
            hidden={hideCards}
            disabled={
              disabled ||
              !canPlayCard(
                cards,
                card,
                leadSuit
              )
            }
            key={index}
            card={card}
            onClick={() =>
              onPlayCard?.(card)
            }
          />
        ))}
      </div>
    </div>
  );
}