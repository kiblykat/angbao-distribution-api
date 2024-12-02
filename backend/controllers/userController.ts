import { userModel } from "../models/User";
import { Request, Response } from "express";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await userModel.find();
    res.status(200).json({ users: users });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const response = await userModel.create({ username: "newUsersr" });
    res.status(201).json(response);
  } catch (err) {
    console.log({ err: err });
    res.status(500).json({ err: err });
  }
};
