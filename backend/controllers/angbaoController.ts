import express from "express";
import { allocateRandomAmounts } from "../services/angbaoAllocator";
import { userModel } from "../models/User";
import {
  dollarsToCents,
  centsToDollars,
} from "../services/dollarCentsConverter";

export const distributeAngbaos = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let userHash: { [key: string]: number } = {}; //take note of this definition*

    //receive request from user
    let { currUserId, totAmountDollars, userArray } = req.body;
    if (!currUserId || !totAmountDollars || !userArray) {
      res.status(400).json({ error: "Invalid Input" });
      return;
    }
    const currUserAccount = await userModel.findById(currUserId);

    //error handling for Insufficient funds
    const totAmountCents = dollarsToCents(parseFloat(totAmountDollars));
    if (currUserAccount) {
      if (currUserAccount?.balance < totAmountCents) {
        res.status(400).json({ error: "Insufficient funds" });
        return;
      }
    }

    //error handling for Invalid userArray
    let userArrayParsed: string[];
    try {
      userArrayParsed = JSON.parse(userArray);
    } catch (err) {
      res.status(400).json({ err: "Invalid userArray" });
      return;
    }

    //populate the userHash
    for (let user of userArrayParsed) {
      userHash[user] = 0;
    }
    let numUsers = userArrayParsed.length;
    let angbaoAllocArray: number[] = allocateRandomAmounts(
      totAmountCents,
      numUsers
    ); //get angbaoAllocArray back from service

    //assign users in userHash to allocation array
    for (let i = 0; i < angbaoAllocArray.length; i++) {
      userHash[userArrayParsed[i]] = angbaoAllocArray[i];
    }

    //decrement currUser balance
    await userModel.findByIdAndUpdate(currUserId, {
      $inc: {
        balance: -totAmountCents,
      },
    });

    //increment angbao participants balance
    for (let key in userHash) {
      await userModel.findByIdAndUpdate(key, {
        $inc: {
          balance: userHash[key],
        },
      });
    }
    res.status(200).json({ res: userHash });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
