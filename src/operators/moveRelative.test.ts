import { initStringCursor } from "../stringCursor";
import { moveRelative } from "./moveRelative";

describe("moveRelative", () => {
  test("The value of startWith parameter is 0 (default)", () => {
    const { apply } = initStringCursor({ text: "some random string" });

    expect(apply(moveRelative, 2)).toBe(2);
    expect(apply(moveRelative, 0)).toBe(2);
    expect(apply(moveRelative, 3)).toBe(5);
    expect(apply(moveRelative, -1)).toBe(4);
    expect(apply(moveRelative, 15)).toBe(17);
    expect(apply(moveRelative, -100)).toBe(0);
  });

  test("The value of startWith parameter is 3", () => {
    const { apply } = initStringCursor({
      text: "some random string",
      startWith: 3,
    });

    expect(apply(moveRelative, 2)).toBe(5);
    expect(apply(moveRelative, 0)).toBe(5);
    expect(apply(moveRelative, 3)).toBe(8);
    expect(apply(moveRelative, -1)).toBe(7);
    expect(apply(moveRelative, 15)).toBe(17);
    expect(apply(moveRelative, -100)).toBe(0);
  });
});
