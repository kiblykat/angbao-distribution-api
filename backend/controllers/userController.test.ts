import { userModel } from "../models/User";
import { Request, Response } from "express";
import request from "supertest";
import express from "express";
import userRouter from "../routes/userRouter";

jest.mock("../models/User", () => ({
  userModel: {
    find: jest.fn(),
    create: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findById: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use("/users", userRouter);

describe("userController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should getAllUsers with status code 200", async () => {
    (userModel.find as jest.Mock).mockResolvedValue({
      _id: "674dcad282b19cbaadf64aa5",
      username: "John",
      balance: 5100,
      __v: 0,
    });
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      users: {
        _id: "674dcad282b19cbaadf64aa5",
        username: "John",
        balance: 5100,
        __v: 0,
      },
    });
  });

  it("should return an error with status code 500", async () => {
    (userModel.find as jest.Mock).mockRejectedValue("Database Error");
    const response = await request(app).get("/users");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Database Error" });
  });

  it("should successfully create a user with status 201", async () => {
    (userModel.create as jest.Mock).mockResolvedValue({
      _id: "674dcad282b19cbaadf64aa5",
      username: "Tanjiro",
      balance: 50000,
      __v: 0,
    });

    const response = await request(app).post("/users").send({
      _id: "674dcad282b19cbaadf64aa5",
      username: "Tanjiro",
      balance: 50000,
      __v: 0,
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      _id: "674dcad282b19cbaadf64aa5",
      username: "Tanjiro",
      balance: 50000,
      __v: 0,
    });
  });
});
