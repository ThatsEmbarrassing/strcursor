import type { BoundOperator } from "./BoundOperator.type";
import type { EmptyOperator } from "./EmptyOperator.interface";

export interface IOperatorContext {
  /**
   * Source text
   *
   * ```ts
   * const { createOperator } = initStringCursor({ text: "dont know what to put here..." });
   * const textLogger = createOperator(({ text }) => {
   *  console.log(text); /// LOG: "dont know what to put here"
   * });
   * ```
   */
  readonly text: string;
  /**
   * Initial position. Equals to the value passed to the `startWith` parameter
   *
   * ```ts
   * const { createOperator } = initStringCursor({ text: "dont know what to put here..." });
   * const initPositionLogger = createOperator(({ initialPosition, move }) => {
   *  console.log(initialPosition); // LOG: 0
   *  move(2);
   *  console.log(initialPosition); // still 0
   * });
   * ```
   *
   * With `startWith` parameter:
   * ```ts
   * const { createOperator } = initStringCursor({ text: "dont know what to put here...", startWith: 2 });
   * const initPositionLogger = createOperator(({ initialPosition, move }) => {
   *   console.log(initialPosition); // LOG: 2
   *   move(5);
   *   console.log(initialPosition); // still 2
   * });
   * ```
   *
   */
  readonly initialPosition: number;
  /**
   * Index of the last char in the string. If the string is empty, the index is 0.
   *
   * ```ts
   * const { createOperator } = initStringCursor({ text: "some random text" });
   *
   * const lastCharLogger = createOperator(({ getChar, lastCharIndex }) => {
   *  console.log(getChar(lastCharIndex));
   * });
   *
   * lastCharLogger(); // LOG: "t"
   * ```
   */
  readonly lastCharIndex: number;
  /**
   * Returns current position.
   * At the beginning, the current position equals to the {@link IOperatorContext.initialPosition}, but can be changed.
   *
   * ```ts
   * const { createOperator } = initStringCursor({ text: "dont know what to put here..." });
   *
   * const currentPositionLogger = createOperator(({ getPosition, move }) => {
   *   console.log(getPosition()); // LOG: 0
   *   move(2);
   *   console.log(getPosition()); // LOG: 2
   * });
   * ```
   *
   * @return {number} current position
   */
  getPosition(): number;
  /**
   * Returns char by index in `by` parameter.
   * If the index goes beyond the text boundaries, it will be changed to the first or the last index
   * (depending on which boundary this index goes beyound).
   *
   * ```ts
   * const { createOperator } = initStringCursor({ text: "dont know what to put here..." });
   *
   * const charLogger = createOperator(({ getChar, text }) => {
   *   console.log(getChar(0)); // LOG: "d"
   *   console.log(getChar(2)); // LOG: "n"
   *   console.log(getChar(text.length - 1)); // LOG: "."
   *   console.log(getChar(-10000)); // same as getChar(0)
   *   console.log(getChar(10000)); // same as getChar(text.length - 1)
   * });
   * ```
   *
   * @param {number} by - index of char
   *
   * @returns {string} found char
   */
  getChar(by: number): string;
  /**
   * Changes position to the index passed to the `to` parameter
   * If the index goes beyond the text boundaries, it will be changed to the first or the last index
   * (depending on which boundary this index goes beyound).
   *
   * Returns new position.
   *
   * ```ts
   * const { createOperator } = initStringCursor({ text: "dont know what to put here..." });
   *
   * const moveLogger = createOperator(({ move, getPosition, text }) => {
   *  console.log(move(0)); // LOG: 0
   *  console.log(getPosition()); // LOG: 0
   *  console.log(move(2)); // LOG: 2
   *  console.log(getPosition()); // LOG: 2
   *  console.log(move(text.length - 1)); // LOG: 28
   *  console.log(move(-10000)); // same as move(0)
   *  console.log(move(10000)) // same as move(text.length - 1)
   * })
   *
   * ```
   *
   * @param to - new position
   *
   * @returns {number} changed position
   */
  move(to: number): number;
  clamp(value: number): number;
  /**
   * Sets the current context to the function created with `createEmptyOperator`.
   *
   * ```ts
   * // a.ts
   * import { createEmptyOperator } from "string-cursor";
   *
   * export const calculateRelativeOperator = createEmptyOperator(({ getPosition }, step: number) => {
   *  return getPosition() + step;
   * });
   *
   * // b.ts
   * import { initStringCursor } from "string-cursor";
   * import { calculateRelativeOperator } from "./a";
   *
   * const { createOperator } = initStringCursor({ text: "dont know what to put here..." });
   *
   * const moveRelative = createOperator(({ bind, move }, to: number = 0) => {
   *  const calculateRelative = bind(calculateRelativeOperator);
   *
   *  return move(calculateRelative(to));
   * });
   *
   * console.log(moveRelative(2)); // LOG: 2
   * console.log(moveRelative(2)); // LOG: 4
   * console.log(moveRelative(-1)); // LOG: 3
   * ```
   *
   * You also can use `bind` in functions created with {@link createEmptyOperator}:
   * ```ts
   * // b.ts
   * import { createEmptyOperator } from "string-cursor";
   * import { calculateRelativeOperator } from "./a";
   *
   * export const moveRelativeOperator = createEmptyOperator(({ bind, move }, to: number = 0) => {
   *  const calculateRelative = bind(calculateRelativeOperator);
   *
   *  return move(calculateRelative(to));
   * })
   *
   * // c.ts
   * import { initStringCursor } from "string-cursor";
   * import { moveRelativeOperator } from './b';
   *
   * const { bind } = initStringCursor({ text: "dont know what to put here..." });
   * const moveRelative = bind(moveRelativeOperator);
   *
   * console.log(moveRelative(2)); // LOG: 2
   * console.log(moveRelative(2)); // LOG: 4
   * console.log(moveRelative(-1)); // LOG: 3
   * ```
   *
   * @param emptyOperator - function created with `createEmptyOperator`
   *
   * @returns function with bound context
   */
  bind<Args extends [...unknown[]], Result>(
    emptyOperator: EmptyOperator<IOperatorContext, Args, Result>
  ): BoundOperator<Args, Result>;
  apply<Args extends [...unknown[]], Result>(
    emptyOperator: EmptyOperator<IOperatorContext, Args, Result>,
    ...args: Args
  ): Result;
}
