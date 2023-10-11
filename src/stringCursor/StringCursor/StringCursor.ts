import { buildOperator } from "../operator";

import type { Operator, EmptyOperator, IOperatorContext } from "../operator";

import type { IStringCursor } from "./types";

export class StringCursor implements IStringCursor {
  constructor(private context: IOperatorContext) {}

  public createOperator<Args extends [...unknown[]], Result>(
    operator: Operator<IOperatorContext, Args, Result>
  ) {
    return buildOperator({
      operator,
      context: this.context,
    });
  }

  public bind<Args extends [...unknown[]], Result>(
    emptyOperator: EmptyOperator<IOperatorContext, Args, Result>
  ) {
    return this.context.bind(emptyOperator);
  }

  public apply<Args extends [...unknown[]], Result>(
    emptyOperator: EmptyOperator<IOperatorContext, Args, Result>,
    ...args: Args
  ) {
    return this.context.apply(emptyOperator, ...args);
  }
}
