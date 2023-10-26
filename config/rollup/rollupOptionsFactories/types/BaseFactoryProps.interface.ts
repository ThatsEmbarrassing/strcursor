import type { ExternalOption, RollupOptions } from "rollup";

export interface BaseFactoryProps {
  input: NonNullable<RollupOptions["input"]>;
  bundleDir: string;
  external?: ExternalOption;
}
