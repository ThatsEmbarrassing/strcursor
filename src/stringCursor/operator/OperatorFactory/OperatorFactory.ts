import type { Operator } from "./types";

export class OperatorFactory<
  Context extends object,
  Args extends [...unknown[]],
  Result
> {
  private context: Context | null = null;

  constructor(private cursorOperator: Operator<Context, Args, Result>) {}

  private setContext(context: Context) {
    this.context = context;
  }

  public bind(context: Context) {
    this.setContext(context);
  }

  public build() {
    if (!this.context) {
      throw new Error("Cursor function's context is not defined.");
    }

    return (...args: Args) =>
      this.cursorOperator(this.context as Context, ...args);
  }
}
