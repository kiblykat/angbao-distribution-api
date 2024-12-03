import express from "express";
import { allocateRandomAmounts } from "../services/angbaoAllocator";

export const distributeAngbaos = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let { totAmount, numUsers } = req.body;
    let response = allocateRandomAmounts(totAmount, numUsers);
    res.status(200).json({ res: response });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
