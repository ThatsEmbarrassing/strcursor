import { createClamp } from "./createClamp";
import { getLastTextIndex } from "./getLastTextIndex";

export type CreateTextBoundsFunction = (
  text: string
) => (value: number) => number;

export const createTextBounds: CreateTextBoundsFunction = (text) =>
  createClamp(0, getLastTextIndex(text));
