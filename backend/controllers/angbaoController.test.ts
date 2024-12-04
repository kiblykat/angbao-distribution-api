import express from "express";
import request from "supertest";
import { allocateRandomAmounts } from "../services/angbaoAllocator";
import { userModel } from "../models/User";
import {
  dollarsToCents,
  centsToDollars,
} from "../services/dollarCentsConverter";
import { distributeAngbaos } from "./angbaoController";

const app = express();
app.use(express.json());
app.use("/angbaos/distribute", distributeAngbaos);

jest.mock("../models/User", () => ({
  userModel: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

// Mock the allocateRandomAmounts function
jest.mock("../services/angbaoAllocator", () => ({
  allocateRandomAmounts: jest.fn(),
}));

jest.mock("../services/dollarCentsConverter", () => ({
  dollarsToCents: jest.fn(),
  centsToDollars: jest.fn(),
}));

describe("angbaoController", () => {
  //correct return
  it("should distribute angbaos and return status code 200", async () => {
    //1. Mock behavior of child funcs expected to be called within parent func
    //userModel.findById for currUser
    (userModel.findById as jest.Mock).mockResolvedValue({
      username: "ChocolateBar",
      balance: 10000,
      _id: "6750535b525af836513a1f66",
      __v: 0,
    });
    //dollarsToCents
    (dollarsToCents as jest.Mock).mockReturnValue(10000);
    //mock allocateRandomAmounts to return [4000,3000,3000]
    (allocateRandomAmounts as jest.Mock).mockReturnValue([4000, 3000, 3000]);

    //2. Call the function
    const response = await request(app).post("/angbaos/distribute").send({
      currUserId: "6750535b525af836513a1f66",
      totAmountDollars: "10.23",
      userArray:
        '["674e7824a6cddab6818afe6f","674e79c0cba2edf55d536255","674e79c5cba2edf55d536257"]',
    });

    //3. List down expectations
    expect(response.status).toBe(200);
    expect(response.body.res).toEqual({
      "674e7824a6cddab6818afe6f": 4000,
      "674e79c0cba2edf55d536255": 3000,
      "674e79c5cba2edf55d536257": 3000,
    });
  });
  //invalid return
  it("should respond with 400 if missing input", async () => {
    const response = await request(app).post("/angbaos/distribute").send({
      currUserId: "",
      totAmountDollars: "1.03",
      userArray:
        '["6750535b525af836513a1f66","674e79c0cba2edf55d536255","674e79c5cba2edf55d536257"]',
    });
    expect(response.status).toBe(400);
  });
  // it("should respond with 400 if insufficient funds");
  // it("should respond with 400 if invalid userArray");
});
