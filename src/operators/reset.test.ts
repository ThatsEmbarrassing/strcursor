import { initStringCursor, createEmptyOperator } from "../stringCursor";
import { reset } from "./reset";

const move = createEmptyOperator(({ move }, to: number) => {
  move(to);
});

const getPosition = createEmptyOperator(({ getPosition }) => {
  return getPosition();
});

describe("reset", () => {
  test("The value of startWith parameter is 0 (default)", () => {
    const { apply } = initStringCursor({ text: "some random string" });

    apply(move, 5);
    expect(apply(reset)).toBe(0);
    expect(apply(getPosition)).toBe(0);
  });

  test("The value of startWith parameter is 3", () => {
    const { apply } = initStringCursor({
      text: "some random string",
      startWith: 3,
    });

    apply(move, 5);
    expect(apply(reset)).toBe(3);
    expect(apply(getPosition)).toBe(3);
  });
});
