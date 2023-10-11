/**
 * Operator with setted context
 * @internal
 *
 * @param args - arguments of the operator
 */
export type BoundOperator<Args extends [...unknown[]], Result> = (
  ...args: Args
) => Result;
