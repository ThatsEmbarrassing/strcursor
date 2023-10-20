import { getLastTextIndex } from "./getLastTextIndex";

describe("getLastTextIndex", () => {
  test("normal string", () => {
    const str = "some random string";
    const expectedIndex = 17;

    expect(getLastTextIndex(str)).toBe(expectedIndex);
  });

  test("string with one char", () => {
    const str = "a";
    const expectedIndex = 0;

    expect(getLastTextIndex(str)).toBe(expectedIndex);
  });

  test("string with no char", () => {
    const str = "";
    const expectedIndex = 0;

    expect(getLastTextIndex(str)).toBe(expectedIndex);
  });
});
