export function getCardLabel(
  value: number
) {
  switch (value) {
    case 11:
      return "J";

    case 12:
      return "Q";

    case 13:
      return "K";

    case 14:
      return "A";

    default:
      return value.toString();
  }
}