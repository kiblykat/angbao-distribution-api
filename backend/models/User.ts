import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  //include money too
});

export const userModel = mongoose.model("User", userSchema);
