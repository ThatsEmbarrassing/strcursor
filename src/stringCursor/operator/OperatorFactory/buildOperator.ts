import { OperatorFactory } from "./OperatorFactory";

import type { BuildOperatorProps } from "./types";

export function buildOperator<
  Context extends object,
  Args extends [...unknown[]],
  Result
>({ context, operator }: BuildOperatorProps<Context, Args, Result>) {
  const newOperator = new OperatorFactory(operator);

  newOperator.bind(context);

  return newOperator.build();
}
