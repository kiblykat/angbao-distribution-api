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
  beforeEach(() => {
    jest.clearAllMocks();
  });
  //Status 200 returns
  it("should distribute angbaos and return status code 200", async () => {
    //1. Mock behavior of child funcs expected to be called within parent func
    //userModel.findById for currUser
    (userModel.findById as jest.Mock).mockResolvedValue({
      username: "ChocolateBar",
      balance: 10000,
      _id: "abc123",
      __v: 0,
    });
    //dollarsToCents
    (dollarsToCents as jest.Mock).mockReturnValue(10000);
    //mock allocateRandomAmounts to return [4000,3000,3000]
    (allocateRandomAmounts as jest.Mock).mockReturnValue([4000, 3000, 3000]);

    //2. Call the function
    const response = await request(app).post("/angbaos/distribute").send({
      currUserId: "user1",
      totAmountDollars: "10.23",
      userArray: '["user2","user3","user4"]',
    });

    //3. List down expectations
    expect(response.status).toBe(200);
    expect(response.body.res).toEqual({
      user2: 4000,
      user3: 3000,
      user4: 3000,
    });
  });

  // Error Handling Returns
  // - missing inputs
  it("should respond with 400 if missing input", async () => {
    const response = await request(app).post("/angbaos/distribute").send({
      currUserId: "",
      totAmountDollars: "1.03",
      userArray: '["user2","user3","user4"]',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Missing Input" });
  });

  // - missing user
  it("should return with 404 if user not found", async () => {
    (userModel.findById as jest.Mock).mockResolvedValue(null);
    const response = await request(app).post("/angbaos/distribute").send({
      currUserId: "user1",
      totAmountDollars: "1.03",
      userArray: '["user2","user3","user4"]',
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "User not found" });
  });

  // - insufficient funds
  it("should respond with 400 for insufficient funds", async () => {
    (userModel.findById as jest.Mock).mockResolvedValue({ balance: 500 });
    (dollarsToCents as jest.Mock).mockReturnValue(1023);
    const response = await request(app).post("/angbaos/distribute").send({
      currUserId: "user1",
      totAmountDollars: "10.23",
      userArray: '["user2", "user3"]',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Insufficient funds" });
  });

  // - invalid userArray
  it("should respond with 400 for invalid userArray", async () => {
    (userModel.findById as jest.Mock).mockResolvedValue({ balance: 2000 });
    const response = await request(app).post("/angbaos/distribute").send({
      currUserId: "user1",
      totAmountDollars: "10.23",
      userArray: "[user2,user3,user4]",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid userArray" });
  });

  it("should respond with status 500 and server error message", async () => {
    (userModel.findById as jest.Mock).mockRejectedValue("Database Error");
    let response = await request(app).post("/angbaos/distribute").send({
      currUserId: "user1",
      totAmountDollars: "10.23",
      userArray: "[user2,user3,user4]",
    });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Database Error" });
  });
});
