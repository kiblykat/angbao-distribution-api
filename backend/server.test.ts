import request from "supertest";
import express from "express";
import angbaoRouter from "./routes/angbaoRouter";
import userRouter from "./routes/userRouter";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

// Mock the database connection (without this, the real connectDB will be used!)
jest.mock("./config/db", () => jest.fn());

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Mock the userModel
// this mocks 'const users = await userModel.find();' in userController
jest.mock("./models/User", () => ({
  userModel: {
    find: jest.fn().mockResolvedValue([
      { _id: "1", username: "John", balance: 10000 },
      { _id: "2", username: "Jane", balance: 10000 },
    ]),
    findById: jest
      .fn()
      .mockResolvedValue([{ _id: "2", username: "Jane", balance: 10000 }]),
  },
  findByIdAndUpdate: jest.fn(),
}));

app.use("/angbaos", angbaoRouter);
app.use("/users", userRouter);

//Test suite
describe("Server", () => {
  beforeAll(() => {
    connectDB();
  });
  //Test case
  it("should respond with 404 for unknown routes", async () => {
    const response = await request(app).get("/unknown-route");
    expect(response.status).toBe(404);
  });

  it("should respond to /users route", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body.users).toHaveLength(2);
  }, 5000);

  it("should respond to /angbaos route", async () => {
    const response = await request(app).post("/angbaos/distribute").send({
      currUserId: "674e7824a6cddab6818afe6f",
      totAmountDollars: "10.23",
      userArray:
        '["674e7824a6cddab6818afe6f","674e79c0cba2edf55d536255","674e79c5cba2edf55d536257"]',
    });
    expect(response.status).not.toBe(404);
  });
});
