import mongoose from "mongoose";

const angbaoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

export const angbaoModel = mongoose.model("User", angbaoSchema);
