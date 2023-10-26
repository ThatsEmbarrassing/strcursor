import { createTextBounds, getLastTextIndex } from "@/lib";

import type { CreateTextBoundsFunction } from "@/lib";
import type {
  EmptyOperator,
  IOperatorContext,
  IOperatorContextFactory,
  IOperatorContextFactoryProps,
} from "./types";

export class OperatorContextFactory implements IOperatorContextFactory {
  private currentPosition: number;
  private clamp: ReturnType<CreateTextBoundsFunction>;
  private text: string;
  private initialPosition: number;

  constructor({ startWith = 0, text }: IOperatorContextFactoryProps) {
    this.text = text;
    this.clamp = createTextBounds(text);
    this.initialPosition = this.clamp(startWith);
    this.currentPosition = this.initialPosition;
  }

  private getPosition() {
    return this.currentPosition;
  }

  private getChar(by: number) {
    return this.text[this.clamp(by)] ?? "";
  }

  private move(to: number) {
    this.currentPosition = this.clamp(to);
    return this.currentPosition;
  }

  private bind<Args extends [...unknown[]], Result>(
    emptyOperator: EmptyOperator<IOperatorContext, Args, Result>
  ) {
    const builtOperator = emptyOperator.buildOperator(this.getContext());

    return builtOperator;
  }

  private apply<Args extends [...unknown[]], Result>(
    emptyOperator: EmptyOperator<IOperatorContext, Args, Result>,
    ...args: Args
  ) {
    return this.bind(emptyOperator)(...args);
  }

  public getContext(): IOperatorContext {
    return {
      text: this.text,
      initialPosition: this.initialPosition,
      lastCharIndex: getLastTextIndex(this.text),
      getChar: (by) => this.getChar(by),
      getPosition: () => this.getPosition(),
      move: (to) => this.move(to),
      clamp: (value) => this.clamp(value),
      bind: <Args extends [...unknown[]], Result>(
        emptyOperator: EmptyOperator<IOperatorContext, Args, Result>
      ) => this.bind(emptyOperator),
      apply: <Args extends [...unknown[]], Result>(
        emptyOperator: EmptyOperator<IOperatorContext, Args, Result>,
        ...args: Args
      ) => this.apply(emptyOperator, ...args),
    };
  }
}
