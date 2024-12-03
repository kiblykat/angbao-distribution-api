import { userModel } from "../models/User";
import { Request, Response } from "express";

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await userModel.find();
    res.status(200).json({ users: users });
  } catch (err) {
    res.status(500).json({ err: err });
  }
}

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const user = req.body;
    const response = await userModel.create({ username: user.username });
    res.status(201).json(response);
  } catch (err) {
    console.log({ err: err });
    res.status(500).json({ err: err });
  }
}
