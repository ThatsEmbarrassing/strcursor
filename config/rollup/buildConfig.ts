import type { RollupOptions } from "rollup";

import { ROLLUP_ENV } from "./constant";

import { DeclarationFactory, JSFactory } from "./rollupOptionsFactories";

import type { BuildConfigProps } from "./types";

export function buildConfig(props: BuildConfigProps): RollupOptions[] {
  const { mode = "development", port = "8080" } = ROLLUP_ENV;

  return [JSFactory({ mode, ...props }), DeclarationFactory({ ...props })];
}
