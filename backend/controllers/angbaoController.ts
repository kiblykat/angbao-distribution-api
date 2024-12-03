import express from "express";
import { allocateRandomAmounts } from "../services/angbaoAllocator";

export const distributeAngbaos = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let hash: { [key: string]: number } = {}; //take note of this definition*

    //receive request from user
    let { totAmount, userArray } = req.body;
    totAmount = parseFloat(totAmount);

    const userArrayParsed: string[] = JSON.parse(userArray);
    console.log(totAmount, userArrayParsed);

    for (let user of userArrayParsed) {
      hash[user] = 0;
    }
    let numUsers = userArrayParsed.length;
    let allocationArray: number[] = allocateRandomAmounts(totAmount, numUsers); //get allocationArray back from service
    for (let i = 0; i < allocationArray.length; i++) {
      hash[userArrayParsed[i]] = allocationArray[i];
    }
    res.status(200).json({ res: hash });
  } catch (err) {
    res.status(500).json({ err: err });
  } finally {
  }
};
