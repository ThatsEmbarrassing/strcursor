import type { IOperatorContext } from "./IOperatorContext.interface";

export interface IOperatorContextFactory {
  getContext(): IOperatorContext;
}
