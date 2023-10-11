import { createEmptyOperator } from "../stringCursor";

export const calculateRelative = createEmptyOperator(
  ({ getPosition, clamp }, step: number) => {
    return clamp(getPosition() + step);
  }
);
