import { resolve } from "path";

import type { RollupOptions } from "rollup";

import clear from "rollup-plugin-delete";
import dts from "rollup-plugin-dts";

import type { DeclarationFactoryProps } from "./types";

export function DeclarationFactory({
  input,
  bundleDir,
}: DeclarationFactoryProps): RollupOptions {
  const outputDir = resolve(bundleDir, "types");

  return {
    input,
    plugins: [clear({ targets: outputDir }), dts()],
    output: {
      dir: outputDir,
      name: "[name].js",
      chunkFileNames: "chunks/[name]-[hash].chunk.d.ts",
    },
  };
}
