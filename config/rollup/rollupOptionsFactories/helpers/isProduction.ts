import type { Mode } from "../types";

export const isProduction = (mode: Mode) => mode === "production";
