export type Operator<
  Context extends object,
  Args extends [...unknown[]],
  Result
> = (context: Context, ...args: Args) => Result;
