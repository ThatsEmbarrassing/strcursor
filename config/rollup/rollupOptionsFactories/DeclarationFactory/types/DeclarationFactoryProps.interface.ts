import type { RollupAliasOptions } from "@rollup/plugin-alias";
import type { BaseFactoryProps } from "../../types";

export interface DeclarationFactoryProps extends BaseFactoryProps {
  aliases: NonNullable<RollupAliasOptions["entries"]>;
}
