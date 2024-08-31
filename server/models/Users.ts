import mongoose from "mongoose";
import { hashPassword } from "../utils/hashPassword";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function () {
  this.password = await hashPassword(this.password);
});
export default mongoose.model("User", userSchema);
