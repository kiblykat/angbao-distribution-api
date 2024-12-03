import express from "express";
import { distributeAngbaos } from "../controllers/angbaoController";

const angbaoRouter = express.Router();

angbaoRouter.get("/angbaos");
angbaoRouter.post("/distribute", distributeAngbaos);

export default angbaoRouter;
