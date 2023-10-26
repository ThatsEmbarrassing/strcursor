import { createEmptyOperator } from "@/stringCursor";
import { calculateRelative } from "./calculateRelative";

export interface CharObject {
  /**
   * Found char
   */
  char: string;
  /**
   * Char's position
   */
  position: number;
  /**
   * True if the char is the last one, otherwise false
   */
  isLastChar: boolean;
}

export const peekRelative = createEmptyOperator<[from: number], CharObject>(
  ({ getChar, apply, lastCharIndex }, from: number) => {
    const position = apply(calculateRelative, from);

    return {
      position,
      char: getChar(position),
      isLastChar: position === lastCharIndex,
    };
  }
);
