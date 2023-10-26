import { resolve } from "path";

import type { RollupOptions } from "rollup";

import clear from "rollup-plugin-delete";
import { minify, default as rollupPluginEsbuild } from "rollup-plugin-esbuild";
import alias from "@rollup/plugin-alias";
import nodeResolve from "@rollup/plugin-node-resolve";

import {
  getCorrectImportObject,
  isProduction,
  makeConditionalPlugin,
} from "../helpers";

import type { JSFactoryProps } from "./types";

//! With enabled --bundleConfigAsCjs rollup flag rollupPluginEsbuild is an object: { default: [ Getter ], ... }
//! So the code below is necessary for the config to be executed correctly:
const esbuild = getCorrectImportObject(rollupPluginEsbuild);

export function JSFactory({
  bundleDir,
  mode,
  aliases,
  ...other
}: JSFactoryProps): RollupOptions {
  const outputDir = resolve(bundleDir, "js");

  const conditionalMinify = makeConditionalPlugin(minify, {
    keepNames: false,
    treeShaking: true,
  });

  return {
    plugins: [
      clear({ targets: outputDir }),
      esbuild(),
      alias({
        entries: aliases,
      }),
      nodeResolve({
        extensions: [".js", ".ts"],
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
    ...other,
  };
}
