import request from "supertest";
import express, { response } from "express";

import {
  getAllUsers,
  createUser,
  deleteUser,
  getSingleUser,
} from "../controllers/userController";
import userRouter from "./userRouter";

const app = express();
app.use("/users", userRouter);

jest.mock("../controllers/userController", () => ({
  getAllUsers: jest.fn((req, res) =>
    res.status(200).json({
      users: [
        {
          _id: "674dcad282b19cbaadf64aa5",
          username: "iLoveAngbaos",
          balance: 5100,
          __v: 0,
        },
      ],
    })
  ),
  createUser: jest.fn((req, res) =>
    res.status(201).json({
      username: "ImNotBankrupt",
      balance: 100,
      _id: "67501647c5c6efdf83d0a9e6",
      __v: 0,
    })
  ),
  deleteUser: jest.fn((req, res) =>
    res.status(200).json({ message: "User deleted" })
  ),
  getSingleUser: jest.fn((req, res) =>
    res.status(200).json({ user: { id: 1, username: "John" } })
  ),
}));

describe("userRouter Suite", () => {
  it("should get all users", async () => {
    const response = await request(app).get("/users");
    expect(response.body.users).toEqual([
      {
        _id: "674dcad282b19cbaadf64aa5",
        username: "iLoveAngbaos",
        balance: 5100,
        __v: 0,
      },
    ]);
  });
  it("should create a user", async () => {
    let response = await request(app).post("/users").send({
      username: "ImNotBankrupt",
      balance: 100,
      _id: "67501647c5c6efdf83d0a9e6",
      __v: 0,
    });
    expect(response.body).toEqual({
      username: "ImNotBankrupt",
      balance: 100,
      _id: "67501647c5c6efdf83d0a9e6",
      __v: 0,
    });
  });
  it("should delete a user", async () => {
    let response = await request(app).delete("/users/:id");
    expect(response.status).toBe(200);
  });
});
