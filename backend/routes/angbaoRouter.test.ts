import express from "express";
import cors from "cors";
import angbaoRouter from "./angbaoRouter";
import { distributeAngbaos } from "../controllers/angbaoController";
import request from "supertest";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/angbaos", angbaoRouter);

jest.mock("../controllers/angbaoController", () => ({
  distributeAngbaos: jest.fn((req, res) =>
    res.status(200).json({ message: "distributeAngbaos" })
  ),
}));

describe("angbaoRouter test", () => {
  it("should return 200 when /angbaos/distribute is requested", async () => {
    const response = await request(app).post("/angbaos/distribute").send({});
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("distributeAngbaos");
  });
});
