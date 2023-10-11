import type { Mode } from "../rollupOptionsFactories";

export interface Env extends NodeJS.ProcessEnv {
  mode?: Mode;
  port?: string;
}
