import { userModel } from "../models/User";
import { Request, Response } from "express";

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await userModel.find();
    res.status(200).json({ users: users });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { username } = req.body;

    if (!username) {
      res.status(400).json({ error: "Username is required" });
      return;
    }

    const response = await userModel.create({ username: username });
    res.status(201).json(response);
  } catch (err) {
    console.log({ error: err });
    res.status(500).json({ error: err });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const response = await userModel.findByIdAndDelete(id);
    if (!response) {
      res.status(404).json({ error: "userModel not found" });
      return;
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export async function getSingleUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
