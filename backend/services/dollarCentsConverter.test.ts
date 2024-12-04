import { dollarsToCents, centsToDollars } from "./dollarCentsConverter";

describe("dollarCentsConverter Service", () => {
  it("should return 100 fold for dollarsToCents", () => {
    let value = dollarsToCents(100);
    expect(value).toBe(100 * 100);
    expect(typeof value).toBe("number");
  });
  it("should return a division by 100 ", () => {
    let value = centsToDollars(10000);
    expect(value).toBe(100);
    expect(typeof value).toBe("number");
  });
});
