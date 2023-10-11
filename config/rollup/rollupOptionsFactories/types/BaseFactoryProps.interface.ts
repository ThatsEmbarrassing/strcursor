import type { RollupOptions } from "rollup";

export interface BaseFactoryProps {
  input: NonNullable<RollupOptions["input"]>;
  bundleDir: string;
}
