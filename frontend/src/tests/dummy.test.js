function dummy(x, y) {
  return x + y;
}

test("adds 1 + 2 to equal 3", () => {
  expect(dummy(1, 2)).toBe(3);
});
