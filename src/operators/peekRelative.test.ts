import { initStringCursor } from "../stringCursor";
import { peekRelative } from "./peekRelative";

import type { CharObject } from "./peekRelative";

describe("peekRelative", () => {
  test("The value of startWith parameter is 0 (default)", () => {
    const { apply } = initStringCursor({ text: "some random string" });

    expect(apply(peekRelative, 0)).toEqual<CharObject>({
      char: "s",
      position: 0,
      isLastChar: false,
    });
    expect(apply(peekRelative, 5)).toEqual<CharObject>({
      char: "r",
      position: 5,
      isLastChar: false,
    });
    expect(apply(peekRelative, -1)).toEqual<CharObject>(apply(peekRelative, 0));
    expect(apply(peekRelative, -100)).toEqual<CharObject>(
      apply(peekRelative, 0)
    );
    expect(apply(peekRelative, 100)).toEqual<CharObject>({
      char: "g",
      position: 17,
      isLastChar: true,
    });
  });

  test("The value of startWith parameter is 3", () => {
    const { apply } = initStringCursor({
      text: "some random string",
      startWith: 3,
    });

    expect(apply(peekRelative, 0)).toEqual<CharObject>({
      char: "e",
      position: 3,
      isLastChar: false,
    });

    expect(apply(peekRelative, 5)).toEqual<CharObject>({
      char: "d",
      position: 8,
      isLastChar: false,
    });

    expect(apply(peekRelative, -1)).toEqual<CharObject>({
      char: "m",
      position: 2,
      isLastChar: false,
    });

    expect(apply(peekRelative, -100)).toEqual<CharObject>(
      apply(peekRelative, -3)
    );

    expect(apply(peekRelative, 100)).toEqual<CharObject>({
      char: "g",
      position: 17,
      isLastChar: true,
    });
  });
});
