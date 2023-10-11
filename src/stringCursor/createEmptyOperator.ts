import { buildEmptyOperator } from "./operator";

import type { Operator, EmptyOperator, IOperatorContext } from "./operator";

import type { IStringCursor } from "./StringCursor";

/**
 * Creates new operator having no context by default.
 * You can use `bind` or `apply` to set the context
 *
 * ```ts
 * // a.ts
 * import { createEmptyOperator } from "string-cursor";
 *
 * export const calculateRelative = createEmptyOperator(({ getPosition }, step: number) => {
 *  return getPosition() + step
 * })
 * ```
 *
 * {@link IStringCursor.bind initStringCursor().bind} example:
 * ```ts
 * // b.ts
 * import { initStringCursor } from "string-cursor";
 *
 * import { calculateRelative } from "./a";
 *
 * const { bind } = initStringCursor({ text: "dont know what to put here...", startWith: 2 })
 *
 * const boundCalculateRelative = bind(calculateRelative);
 * console.log(boundCalculateRelative(0)) // LOG: 2
 * console.log(boundCalculateRelative(4)) // LOG: 6
 * console.log(boundCalculateRelative(-1)) // LOG: 1
 * ```
 *
 * {@link IOperatorContext.bind context.bind} example:
 * ```ts
 * const { create=Operator } = initStringCursor({ text: "dont know what to put here..." });
 *
 * const moveRelative = createOperator(({ bind, move }, to: number = 0) => {
 *  const boundCalculateRelative = bind(calculateRelative);
 *
 *  return move(boundCalculateRelative(to));
 * });
 *
 * console.log(moveRelative(2)); // LOG: 2
 * console.log(moveRelative(2)); // LOG: 4
 * console.log(moveRelative(-1)); // LOG: 3
 * ```
 * @param {operator} operator
 * @returns
 */
export function createEmptyOperator<Args extends [...unknown[]], Result>(
  operator: Operator<IOperatorContext, Args, Result>
): EmptyOperator<IOperatorContext, Args, Result> {
  return buildEmptyOperator(operator);
}
