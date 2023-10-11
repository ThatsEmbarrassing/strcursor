import { createOperatorContext } from "./operator";

import { StringCursor } from "./StringCursor";

import type {
  Operator,
  EmptyOperator,
  IOperatorContext,
  IOperatorContextFactoryProps,
} from "./operator";

import type { IStringCursor } from "./StringCursor";

export function initStringCursor(
  options: IOperatorContextFactoryProps
): IStringCursor {
  const context = createOperatorContext(options);
  const stringCursor = new StringCursor(context);

  const bind = <Args extends [...unknown[]], Result>(
    emptyCursorFunction: EmptyOperator<IOperatorContext, Args, Result>
  ) => stringCursor.bind(emptyCursorFunction);

  const apply = <Args extends [...unknown[]], Result>(
    emptyCursorFunction: EmptyOperator<IOperatorContext, Args, Result>,
    ...args: Args
  ) => {
    return stringCursor.apply(emptyCursorFunction, ...args);
  };

  const createOperator = <Args extends [...unknown[]], Result>(
    cursorFunction: Operator<IOperatorContext, Args, Result>
  ) => stringCursor.createOperator(cursorFunction);

  return {
    bind,
    apply,
    createOperator,
  };
}
