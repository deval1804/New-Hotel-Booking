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

// Middleware to check if the user is authenticated
export const protect = async (req, res, next) => {
    console.log("protect middleware called");
    console.log("req.auth →", req.auth);                    // ← debug
    console.log("Authorization header →", req.headers.authorization); // ← debug

    const { userId } = req.auth || {};  // safe access

    if (!userId) {
        console.log("No userId found in req.auth");
        return res.status(401).json({
            success: false,
            message: "Not authenticated - please login"
        });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found in database"
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Error in protect middleware:", err);
        return res.status(500).json({
            success: false,
            message: "Server error during authentication"
        });
    }
};