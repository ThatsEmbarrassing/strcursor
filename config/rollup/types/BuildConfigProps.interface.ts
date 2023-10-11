import type { RollupAliasOptions } from "@rollup/plugin-alias";
import type { JSFactoryProps } from "../rollupOptionsFactories";

export interface BuildConfigProps {
  input: JSFactoryProps["input"];
  bundleDir: string;
  aliases: NonNullable<RollupAliasOptions["entries"]>;
}
