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
    const { username } = req.body;

    if (!username) {
      res.status(400).json({ error: "username is required" });
      return;
    }

    const response = await userModel.create({ username: username });
    res.status(201).json(response);
  } catch (err) {
    console.log({ err: err });
    res.status(500).json({ err: err });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const response = await userModel.findByIdAndDelete(id);
    if (!response) {
      res.status(404).json({ error: "completedModel not found" });
      return;
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ err: err });
  }
}
