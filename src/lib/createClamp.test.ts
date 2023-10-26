import { createClamp } from "./createClamp";

test("curriedClamp", () => {
  const clamp = createClamp(0, 5);

  expect(clamp(0)).toBe(0);
  expect(clamp(3)).toBe(3);
  expect(clamp(5)).toBe(5);
  expect(clamp(6)).toBe(5);
});
