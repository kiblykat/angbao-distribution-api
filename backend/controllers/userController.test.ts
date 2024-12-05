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

  it("should return an error with status code 500 for getAllUsers", async () => {
    (userModel.find as jest.Mock).mockRejectedValue("Database Error");
    const response = await request(app).get("/users");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Database Error" });
  });

  it("should return 400 if username is missing", async () => {
    const response = await request(app).post("/users").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Username is required" });
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

  it("should return an error with status code 500 when creating a user", async () => {
    (userModel.create as jest.Mock).mockRejectedValue("Database Error");
    const response = await request(app).post("/users").send({
      username: "Tanjiro",
    });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Database Error" });
  });

  it("should delete a user with status code 200", async () => {
    (userModel.findByIdAndDelete as jest.Mock).mockResolvedValue({
      _id: "674dcad282b19cbaadf64aa5",
      username: "John",
      balance: 5100,
      __v: 0,
    });
    const response = await request(app).delete(
      "/users/674dcad282b19cbaadf64aa5"
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      _id: "674dcad282b19cbaadf64aa5",
      username: "John",
      balance: 5100,
      __v: 0,
    });
  });
});
