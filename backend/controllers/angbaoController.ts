import express from "express";

export const distributeRandomAmounts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
