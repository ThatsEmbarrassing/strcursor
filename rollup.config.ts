import { buildConfig } from "./config/rollup";

export default buildConfig({
  bundleDir: "./dist",
  input: {
    index: "./src/stringCursor/index.ts",
    operators: "./src/operators/index.ts",
  },
  aliases: {},
});
