import express from "express";

import {
  getAllUsers,
  createUser,
  deleteUser,
} from "../controllers/userController";

const userRouter = express.Router();

// Endpoint: /users

userRouter.get("/", getAllUsers);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
