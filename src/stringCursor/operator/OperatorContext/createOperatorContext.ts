import { OperatorContextFactory } from "./OperatorContextFactory";

import type { IOperatorContext, IOperatorContextFactoryProps } from "./types";

export function createOperatorContext({
  text,
  startWith = 0,
}: IOperatorContextFactoryProps): IOperatorContext {
  const contextFactory = new OperatorContextFactory({ text, startWith });

  return contextFactory.getContext();
}
