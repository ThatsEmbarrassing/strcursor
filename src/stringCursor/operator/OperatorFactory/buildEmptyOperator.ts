import { buildOperator } from "./buildOperator";

import type { EmptyOperator } from "../OperatorContext";
import type { Operator } from "./types";

export function buildEmptyOperator<
  Context extends object,
  Args extends [...unknown[]],
  Result
>(
  operator: Operator<Context, Args, Result>
): EmptyOperator<Context, Args, Result> {
  const build = (context: Context) => {
    return buildOperator({
      operator,
      context,
    });
  };

  return {
    build,
  };
}
