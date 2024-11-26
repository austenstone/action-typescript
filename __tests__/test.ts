const testEnvVars = {
  INPUT_MY_INPUT: "val",
};

beforeEach(() => {
  for (const key in testEnvVars) {
    process.env[key] = testEnvVars[key];
  }
  process.stdout.write = jest.fn();
});

test("basic test", () => {
  expect(true).toBe(true);
  expect(false).toBe(false);
});
