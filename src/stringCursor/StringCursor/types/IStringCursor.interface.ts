import type { BoundOperator } from "../../operator";
import type { Operator, EmptyOperator, IOperatorContext } from "../../operator";

export interface IStringCursor {
  /**
   * Creates new operator with setted context of current string cursor
   *
   * ```ts
   * const { createOperator } = initStringCursor({ text: ... });
   *
   * const getCurrentPosition = createOperator(({ getPosition }) => {
   *    return getPosition();
   * });
   *
   * console.log(getCurrentPosition()); // LOG: 0
   * ```
   *
   * With arguments:
   * ```ts
   * const { createOperator } = initStringCursor({ text: ... });
   *
   * const doSmth = createOperator((context, a: number, b: number) => {
   *    return a + b;
   * });
   *
   * console.log(doSmth(2, 5)); // LOG: 7
   *
   * ```
   *
   * @param cursorFunction
   */
  createOperator<Args extends [...unknown[]], Result>(
    operator: Operator<IOperatorContext, Args, Result>
  ): BoundOperator<Args, Result>;
  /**
   * Sets the context of current string cursor to the operator created with createEmptyOperator and returns it with setted context.
   * Same as {@link IOperatorContext.bind context.bind}
   *
   * ```ts
   * // a.ts
   * import { createEmptyOperator } from "string-cursor";
   *
   * const doSmth = createEmptyOperator((context, a: number, b: number) => {
   *    return a + b;
   * });
   *
   * // b.ts
   * import { initStringCursor } from "string-cursor";
   * import { doSmth } from './a';
   *
   * const { bind } = initStringCursor({ text: ... })
   *
   * const boundDoSmth = bind(doSmth);
   *
   * console.log(boundDoSmth(2, 5)); // LOG: 7
   * ```
   *
   * @param emptyOperator operator created with createEmptyOperator
   *
   * @returns bound operator
   */
  bind<Args extends [...unknown[]], Result>(
    emptyOperator: EmptyOperator<IOperatorContext, Args, Result>
  ): BoundOperator<Args, Result>;

  /**
   * Sets the context of current string cursor to the operator and calls it immediately. Returns result of called operator.
   *
   * @param emptyOperator
   * @param args - arguments of the operator
   */
  apply<Args extends [...unknown[]], Result>(
    emptyOperator: EmptyOperator<IOperatorContext, Args, Result>,
    ...args: Args
  ): Result;
}
