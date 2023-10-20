import type { BoundOperator } from "./BoundOperator.type";

/**
 * @typeParam {object} Context - the context of string cursor
 * @typeParam {array<unknown>} Args - arguments of the operator
 * @typeParam Result - return type of operator
 *
 * @internal
 *
 */
export interface EmptyOperator<
  Context extends object,
  Args extends [...unknown[]],
  Result
> {
  /**
   * @param context - string cursor's context
   * @returns - bound cursor function
   */
  buildOperator: (context: Context) => BoundOperator<Args, Result>;
}
