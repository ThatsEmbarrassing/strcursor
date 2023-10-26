import type { Config } from "jest";

export default async (): Promise<Config> => {
  return {
    verbose: true,
    moduleDirectories: ["<rootDir>/src", "node_modules"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
    },
  };
};
