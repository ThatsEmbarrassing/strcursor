import { createEmptyOperator } from "@/stringCursor";
import { calculateRelative } from "./calculateRelative";

export const moveRelative = createEmptyOperator(
  ({ move, apply }, to: number) => {
    const position = apply(calculateRelative, to);

    return move(position);
  }
);
