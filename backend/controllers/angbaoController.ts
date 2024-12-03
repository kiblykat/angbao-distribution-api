import express from "express";
import { allocateRandomAmounts } from "../services/angbaoAllocator";

export const distributeAngbaos = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let userHash: { [key: string]: number } = {}; //take note of this definition*

    //receive request from user
    let { totAmount, userArray } = req.body;

    //parse string to JS structure
    totAmount = parseFloat(totAmount);
    const userArrayParsed: string[] = JSON.parse(userArray);
    console.log(totAmount, userArrayParsed);

    //populate the userHash
    for (let user of userArrayParsed) {
      userHash[user] = 0;
    }
    let numUsers = userArrayParsed.length;
    let angbaoAllocArray: number[] = allocateRandomAmounts(totAmount, numUsers); //get angbaoAllocArray back from service

    //assign users in userHash to allocation array
    for (let i = 0; i < angbaoAllocArray.length; i++) {
      userHash[userArrayParsed[i]] = angbaoAllocArray[i];
    }
    res.status(200).json({ res: userHash });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
