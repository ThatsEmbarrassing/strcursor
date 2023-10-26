import { resolve } from "path";

import { buildConfig } from "./config/rollup";

export default buildConfig({
  bundleDir: "./dist",
  input: {
    "operator/context": "./src/stringCursor/operator/OperatorContext/index.ts",
    "operator/factory": "./src/stringCursor/operator/OperatorFactory/index.ts",
    index: "./src/stringCursor/index.ts",
    operators: "./src/operators/index.ts",
  },
  aliases: [
    {
      find: "@",
      replacement: resolve(__dirname, "src"),
    },
    {
      find: "@lib",
      replacement: resolve(__dirname, "src/lib"),
    },
  ],
});
