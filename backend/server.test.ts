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
});
