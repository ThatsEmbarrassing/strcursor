import { buildEmptyOperator } from "./buildEmptyOperator";

test("buildEmptyOperator", () => {
  const jestOperator = jest.fn<void, []>();

  const emptyOperator = buildEmptyOperator(jestOperator);
  const operator = emptyOperator.buildOperator({});

  operator();
  expect(jestOperator.mock.calls).toHaveLength(1);
});
