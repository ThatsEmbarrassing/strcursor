import { curriedClamp } from "./curriedClamp";
import { getLastTextIndex } from "./getLastTextIndex";

export type CreateTextBoundsFunction = (
  text: string
) => (value: number) => number;

export const createTextBounds: CreateTextBoundsFunction = (text) =>
  curriedClamp(0, getLastTextIndex(text));
