import express from "express";

import {
  getAllUsers,
  createUser,
  deleteUser,
  getSingleUser,
} from "../controllers/userController";

const userRouter = express.Router();

// Endpoint: /users

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getSingleUser);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
