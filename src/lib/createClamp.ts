export const createClamp = (min: number, max: number) => (value: number) =>
  Math.min(Math.max(value, min), max);
