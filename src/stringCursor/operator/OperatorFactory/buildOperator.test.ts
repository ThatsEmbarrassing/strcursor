import { buildOperator } from "./buildOperator";

test("buildOperator", () => {
  const jestOperator = jest.fn<void, []>();

  const operator = buildOperator({ context: {}, operator: jestOperator });
  operator();
  expect(jestOperator.mock.calls).toHaveLength(1);
});
