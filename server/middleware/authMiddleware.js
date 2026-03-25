import User from "../models/User.js";

//Middleware to check if the user is authenticated
export const protect = async (req, res, next) => {
    console.log("AUTH DATA:", req.auth);

    const { userId } = req.auth || {};

    if (!userId) {
        return res.json({ success: false, message: "not authenticated" });
    }

    const user = await User.findById(userId);
    req.user = user;
    next();
};
