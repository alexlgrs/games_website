import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {type: String, required: true},
  displayName: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}
  // ajouter le reste
});

export const User = model("User", userSchema);
