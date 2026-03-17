// import User from "../models/User.js";

// //Middleware to check if the user is authenticated
// // export const protect = async (req, res, next) => {
// //     const { userId } = req.auth;
// //     if (!userId) {
// //          res.json({ success: false, message: "not authenticated" })
// //     }
// //     else{
// //         const user = await User.findById(userId);
// //         req.user = user;
// //         next();
// //     }
// // }

// export const protect = async (req, res, next) => {

//     console.log("AUTH DATA:", req.auth);

//     const { userId } = req.auth;

//     if (!userId) {
//         return res.json({ success: false, message: "not authenticated" });
//     }

//     const user = await User.findById(userId);

//     req.user = user;
//     next();
// }

import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {

    console.log("AUTH DATA:", req.auth);
    console.log("HEADERS:", req.headers.authorization);

    const { userId } = req.auth || {};

    if (!userId) {
      return res.json({ success: false, message: "not authenticated" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found in DB" });
    }

    req.user = user;

    next();

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};