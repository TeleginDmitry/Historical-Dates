import { compareObjects } from "../compareObjects";

describe("compareObjects", () => {
  it("should return true if the objects are equal", () => {
    const currentObj = { a: 1, b: 2 };
    const compareObj = { a: 1, b: 2 };
    const result = compareObjects(currentObj, compareObj);
    expect(result).toBe(true);
  });

  it("should return false if the objects are not equal", () => {
    const currentObj = { a: 1, b: 2 };
    const compareObj = { a: 1, b: 3 };
    const result = compareObjects(currentObj, compareObj);
    expect(result).toBe(false);
  });
});
