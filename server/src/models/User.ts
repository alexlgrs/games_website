import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  displayName: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  exp: {type: Number, default: 0},
  level: {type: Number, default: 1}
});

export const User = model("User", userSchema);
