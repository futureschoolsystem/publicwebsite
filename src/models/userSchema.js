import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: [true, "Name Field is Required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    default: "user",
  },
  allowedPages: {
    type: [String],
    default: [],
  },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;