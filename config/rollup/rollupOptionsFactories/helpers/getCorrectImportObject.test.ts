import { getCorrectImportObject } from "./getCorrectImportObject";

test("getCorrectImportObject", () => {
  expect(getCorrectImportObject(null)).toBeNull();
  expect(getCorrectImportObject(undefined)).toBeNull();
  expect(getCorrectImportObject(false)).toBeFalsy();
  expect(getCorrectImportObject(true)).toBeTruthy();
  expect(getCorrectImportObject(0)).toBe(0);
  expect(getCorrectImportObject(1)).toBe(1);
  expect(getCorrectImportObject("some random string")).toBe(
    "some random string"
  );

  const foo = () => 2;
  expect(getCorrectImportObject(foo)).toEqual(foo);

  const obj = { a: 1, b: 2, c: 3 };
  expect(getCorrectImportObject(obj)).toEqual(obj);

  const objWithDefault = { a: 1, b: 2, c: 3, default: "default string" };
  expect(getCorrectImportObject(objWithDefault)).toBe("default string");
});
