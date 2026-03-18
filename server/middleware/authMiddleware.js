// import User from "../models/User.js";

// //Middleware to check if the user is authenticated
// export const protect = async (req, res, next) => {
//     const { userId } = req.auth;
//     if (!userId) {
//          res.json({ success: false, message: "not authenticated" })
//     }
//     else{
//         const user = await User.findById(userId);
//         req.user = user;
//         next();
//     }
// }

import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {

        const { userId } = req.auth;

        if (!userId) {
            return res.json({ success: false, message: "Not authenticated" });
        }
console.log("Auth Data:", req.auth);
        let user = await User.findById(userId);

        // ⭐ agar user DB me nahi mila to create kar do
        if (!user) {
            user = await User.create({
                _id: userId
            });
        }

        req.user = user;

        next();

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};