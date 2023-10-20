import { createOperatorContext } from "./createOperatorContext";
import { OperatorContextFactory } from "./OperatorContextFactory";

test("createOperatorContext", () => {
  const str = "some random string";

  const context1 = new OperatorContextFactory({ text: str }).getContext();
  const context2 = createOperatorContext({ text: str });

  expect(Object.keys(context1)).toEqual(Object.keys(context2));
});
