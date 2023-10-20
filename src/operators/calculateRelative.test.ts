import { initStringCursor } from "../stringCursor";
import { calculateRelative } from "./calculateRelative";

describe("calculateRelative", () => {
  test("The value of startWith parameter is 0 (default)", () => {
    const { apply } = initStringCursor({ text: "some random string" });

    expect(apply(calculateRelative, 5)).toBe(5);
    expect(apply(calculateRelative, 10)).toBe(10);
    expect(apply(calculateRelative, 17)).toBe(17);
    expect(apply(calculateRelative, -1)).toBe(0);
    expect(apply(calculateRelative, 18)).toBe(17);
  });

  test("The value of startWith parameter is 3", () => {
    const { apply } = initStringCursor({
      text: "some random string",
      startWith: 3,
    });

    expect(apply(calculateRelative, 5)).toBe(8);
    expect(apply(calculateRelative, 10)).toBe(13);
    expect(apply(calculateRelative, 17)).toBe(17);
    expect(apply(calculateRelative, -1)).toBe(2);
    expect(apply(calculateRelative, 18)).toBe(17);
  });

  test("The valud of startWith parameter is negative", () => {
    const { apply } = initStringCursor({
      text: "some random string",
      startWith: -2,
    });

    expect(apply(calculateRelative, 5)).toBe(5);
    expect(apply(calculateRelative, 10)).toBe(10);
    expect(apply(calculateRelative, 17)).toBe(17);
    expect(apply(calculateRelative, -1)).toBe(0);
    expect(apply(calculateRelative, 18)).toBe(17);
  });
});
