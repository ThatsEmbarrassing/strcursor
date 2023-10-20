import type { BuildOperatorProps } from "./types";

import { buildEmptyOperator } from "./buildEmptyOperator";

export function buildOperator<
  Context extends object,
  Args extends [...unknown[]],
  Result
>({ context, operator }: BuildOperatorProps<Context, Args, Result>) {
  return buildEmptyOperator(operator).buildOperator(context);
}
