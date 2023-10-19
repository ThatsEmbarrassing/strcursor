import { resolve } from "path";

import type { RollupOptions } from "rollup";

import clear from "rollup-plugin-delete";
import esbuild, { minify } from "rollup-plugin-esbuild";
import alias from "@rollup/plugin-alias";

import { isProduction, makeConditionalPlugin } from "../helpers";

import type { JSFactoryProps } from "./types";

export function JSFactory({
  input,
  bundleDir,
  mode,
  aliases,
}: JSFactoryProps): RollupOptions {
  const outputDir = resolve(bundleDir, "js");

  const conditionalMinify = makeConditionalPlugin(minify, {
    keepNames: false,
    treeShaking: true,
  });

  return {
    input,
    external: ["ramda"],
    plugins: [
      clear({ targets: outputDir }),
      esbuild(),
      alias({
        entries: aliases,
      }),
      conditionalMinify(isProduction(mode)),
    ],
    output: {
      dir: outputDir,
      format: "cjs",
      name: "[name].js",
      exports: "named",
      chunkFileNames: "chunks/[name]-[hash].chunk.js",
    },
  };
}
