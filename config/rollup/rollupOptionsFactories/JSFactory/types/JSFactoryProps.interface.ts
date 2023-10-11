import { RollupAliasOptions } from "@rollup/plugin-alias";
import type { BaseFactoryProps, Mode } from "../../types";

export interface JSFactoryProps extends BaseFactoryProps {
  mode: Mode;
  aliases: NonNullable<RollupAliasOptions["entries"]>;
}
