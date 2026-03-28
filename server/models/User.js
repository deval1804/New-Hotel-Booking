import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, default: "" },
    username: { type: String, default: "" },
    image: { type: String, default: "" },
    role: { type: String, default: "user" },
    recentSearchedCities: { type: [String], default: [] },
  },
  { _id: false }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;