import { createEmptyOperator } from "@/stringCursor";

/**
 * @group operators
 */
export const reset = createEmptyOperator(({ initialPosition, move }) => {
  return move(initialPosition);
});
