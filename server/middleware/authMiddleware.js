import { getAuth } from "@clerk/express";
import User from "../models/User.js";

export const protect = async (req, res, next) => {

    const { userId } = getAuth(req);

    console.log("USER ID:", userId);   // ⭐ add this
    console.log("HEADERS:", req.headers.authorization);   

    if (!userId) {
        return res.json({ success: false, message: "not authenticated" });
    } 

    const user = await User.findById(userId);
    req.user = user;

    next();
};