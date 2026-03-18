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

    if (!req.auth || !req.auth.userId) {
      return res.json({ success: false, message: "Not authenticated" });
    }

    const userId = req.auth.userId;

    let user = await User.findById(userId);

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