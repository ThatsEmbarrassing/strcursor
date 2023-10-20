import { OperatorFactory } from "./OperatorFactory";

describe("OperatorFactory", () => {
  const jestOperator = jest.fn<void, []>();

  const operatorFactory = new OperatorFactory(jestOperator);
  operatorFactory.bind({});

  afterEach(() => {
    jestOperator.mockClear();
  });

  test("build", () => {
    const operator = operatorFactory.build();
    operator();
    expect(jestOperator.mock.calls).toHaveLength(1);
  });
});
