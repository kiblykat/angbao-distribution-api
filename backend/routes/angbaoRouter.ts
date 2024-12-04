import express from "express";
import { distributeAngbaos } from "../controllers/angbaoController";

const angbaoRouter = express.Router();

// Endpoint: /angbaos
angbaoRouter.post("/distribute", distributeAngbaos);

export default angbaoRouter;
