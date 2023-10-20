import type { IOperatorContext } from "../types";

export interface IOperatorContextFactory {
  getContext(): IOperatorContext;
}
