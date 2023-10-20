import type { EmptyOperator } from "../OperatorContext";
import type { Operator } from "./types";
import { OperatorFactory } from "./OperatorFactory";

export function buildEmptyOperator<
  Context extends object,
  Args extends [...unknown[]],
  Result
>(
  operator: Operator<Context, Args, Result>
): EmptyOperator<Context, Args, Result> {
  const operatorFactory = new OperatorFactory(operator);

  const buildOperator = (context: Context) => {
    operatorFactory.bind(context);
    return operatorFactory.build();
  };

  return {
    buildOperator,
  };
}
