import type { Operator } from "./Operator.type";

export interface BuildOperatorProps<
  Context extends object,
  Args extends [...unknown[]],
  Result
> {
  context: Context;
  operator: Operator<Context, Args, Result>;
}
