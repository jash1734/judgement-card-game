import { Card as CardType } from "@/types/game";
import { getCardLabel } from "@/utils/card";
import { motion } from "framer-motion";
type Props = {
  card: CardType;
  onClick?: () => void;
  disabled?: boolean;
  hidden?: boolean;
};

export default function Card({
  card,
  onClick,
  disabled,
  hidden,
}: Props) {
  const isRed =
    card.suit === "hearts" ||
    card.suit === "diamonds";

  const textColor = isRed
    ? "text-red-500"
    : "text-black";

  const label = getCardLabel(card.value);
  if (hidden) {
  return (
    <div
      className="
        w-20
        h-28
        rounded-xl
        border-2
        border-white
        bg-blue-700
        shadow-lg
      "
    />
  );
}

  return (
    <motion.button
      onClick={onClick}
      initial={{
  opacity: 0,
  y: 30,
}}

animate={{
  opacity: 1,
  y: 0,
}}

whileHover={{
  y: -10,
  scale: 1.05,
}}

whileTap={{
  scale: 0.95,
}}

transition={{
  duration: 0.2,
}}
      disabled={disabled}
      className={`
  relative
  w-20
  h-28
  bg-white
  rounded-xl
  shadow-lg
  border-2
  transition
  ${
    disabled
      ? "cursor-not-allowed"
    : "hover:-translate-y-2"
  }
`}
    >
    {disabled && (
      <div className="absolute inset-0 bg-black/40 rounded-xl z-10"/>
    )}
      {/* Top Left */}
      <div
        className={`
          absolute
          top-2
          left-2
          font-bold
          ${textColor}
        `}
      >
        {label}
      </div>

      {/* Center Suit */}
      <div
        className={`
          absolute
          inset-0
          flex
          items-center
          justify-center
          text-3xl
          ${textColor}
        `}
      >
        {getSuitSymbol(card.suit)}
      </div>

      {/* Bottom Right */}
      <div
        className={`
          absolute
          bottom-2
          right-2
          font-bold
          ${textColor}
        `}
      >
        {label}
      </div>
    </motion.button>
  );
}

function getSuitSymbol(suit: string) {
  switch (suit) {
    case "hearts":
      return "♥";

    case "diamonds":
      return "♦";

    case "clubs":
      return "♣";

    case "spades":
      return "♠";

    default:
      return "";
  }
}