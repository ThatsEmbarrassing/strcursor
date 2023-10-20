import { createTextBounds } from "./createTextBounds";

test("createTextBounds", () => {
  const str = "some random string";
  const bounds = createTextBounds(str);

  expect(bounds(0)).toBe(0);
  expect(bounds(5)).toBe(5);
  expect(bounds(17)).toBe(17);
  expect(bounds(18)).toBe(17);
});
