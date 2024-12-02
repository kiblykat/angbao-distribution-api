import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

export const userModel = mongoose.model("User", userSchema);
