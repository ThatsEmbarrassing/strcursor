import { resolve } from "path";

import type { RollupOptions } from "rollup";

import clear from "rollup-plugin-delete";
import rollupPluginDts from "rollup-plugin-dts";
import alias from "@rollup/plugin-alias";
import nodeResolve from "@rollup/plugin-node-resolve";

import type { DeclarationFactoryProps } from "./types";
import { getCorrectImportObject } from "../helpers";

//! With enabled --bundleConfigAsCjs rollup flag rollupPluginDts is an object: { default: [ Getter ], ... }
//! So the code below is necessary for the config to be executed correctly:
const dts = getCorrectImportObject(rollupPluginDts);

export function DeclarationFactory({
  bundleDir,
  aliases,
  ...other
}: DeclarationFactoryProps): RollupOptions {
  const outputDir = resolve(bundleDir, "types");

  return {
    plugins: [
      clear({ targets: outputDir }),
      dts(),
      alias({
        entries: aliases,
      }),
      nodeResolve({
        extensions: [".js", ".ts"],
      }),
    ],
    output: {
      dir: outputDir,
      name: "[name].js",
      chunkFileNames: "chunks/[name]-[hash].chunk.d.ts",
    },
    ...other,
  };
}
