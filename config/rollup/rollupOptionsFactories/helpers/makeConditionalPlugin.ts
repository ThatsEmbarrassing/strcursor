import type { Plugin } from "rollup";

type FunctionPlugin<Args extends [...unknown[]]> = (...args: Args) => Plugin;

export const makeConditionalPlugin = <Args extends [...unknown[]]>(
  plugin: FunctionPlugin<Args>,
  ...args: Args
) => {
  return (condition: boolean) => condition && plugin(...args);
};
