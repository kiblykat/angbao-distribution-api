import express from "express";

const angbaoRouter = express.Router();

angbaoRouter.get("/angbaos");
angbaoRouter.post("/distribute");

export default angbaoRouter;
