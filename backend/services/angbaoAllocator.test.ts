import { allocateRandomAmounts } from "./angbaoAllocator";

describe("angbaoAllocator Service", () => {
  it("sum of all participants allocation should add up to totAmount", () => {
    let totAmount = 10000;
    let numUsers = 10;
    let allocationArray = allocateRandomAmounts(totAmount, numUsers);
    expect(allocationArray.reduce((a, b) => a + b)).toBe(totAmount);
  });
});
