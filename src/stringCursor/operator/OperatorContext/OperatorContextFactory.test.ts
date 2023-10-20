import { OperatorContextFactory } from "./OperatorContextFactory";
import type { IOperatorContext } from "./types";

describe("OperatorContextFactory", () => {
  const sourceText = "some random string";

  const {
    apply,
    bind,
    clamp,
    getChar,
    getPosition,
    initialPosition,
    lastCharIndex,
    move,
    text,
  } = new OperatorContextFactory({
    text: sourceText,
  }).getContext();

  const jestOperator = jest.fn<void, [context: IOperatorContext]>();

  const pseudoEmptyOperator = {
    buildOperator: () => jestOperator,
  };

  afterEach(() => {
    move(0);
  });

  afterEach(() => {
    jestOperator.mockClear();
  });

  test("text", () => {
    expect(text).toBe(sourceText);
  });

  test("lastCharIndex", () => {
    expect(lastCharIndex).toBe(text.length - 1);
  });

  test("initialPosition", () => {
    expect(initialPosition).toBe(0);
  });

  test("move", () => {
    expect(move(0)).toBe(0);
    expect(move(1)).toBe(1);
    expect(move(17)).toBe(17);
    expect(move(-1)).toBe(0);
    expect(move(18)).toBe(17);
  });

  test("getPosition", () => {
    move(5);
    expect(getPosition()).toBe(5);
  });

  test("getChar", () => {
    expect(getChar(0)).toBe("s");
    expect(getChar(1)).toBe("o");
    expect(getChar(17)).toBe("g");
    expect(getChar(-1)).toBe("s");
    expect(getChar(18)).toBe("g");
  });

  test("clamp", () => {
    expect(clamp(0)).toBe(0);
    expect(clamp(1)).toBe(1);
    expect(clamp(17)).toBe(17);
    expect(clamp(-1)).toBe(0);
    expect(clamp(18)).toBe(17);
  });

  test("bind", () => {
    const operator = bind(pseudoEmptyOperator);
    operator({} as IOperatorContext);
    expect(jestOperator.mock.calls).toHaveLength(1);
  });

  test("apply", () => {
    apply(pseudoEmptyOperator, {} as IOperatorContext);
    expect(jestOperator.mock.calls).toHaveLength(1);
  });
});
