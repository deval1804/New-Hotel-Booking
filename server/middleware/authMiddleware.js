import { getAuth } from "@clerk/express";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const auth = getAuth(req);

    console.log("AUTH:", auth);
    console.log("USER ID:", auth?.userId);
    console.log("AUTH HEADER:", req.headers.authorization);

    if (!auth?.userId) {
      return res.status(401).json({
        success: false,
        message: "not authenticated",
      });
    }

    const user = await User.findById(auth.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found in database",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Protect error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};