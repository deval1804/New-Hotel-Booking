import { getAuth } from "@clerk/express";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const auth = getAuth(req);

        console.log("AUTH:", auth);

        if (!auth || !auth.userId) {
            return res.status(401).json({
                success: false,
                message: "not authenticated"
            });
        }

        req.userId = auth.userId;

        next();

    } catch (error) {
        console.log("ERROR:", error);
        return res.status(401).json({
            success: false,
            message: "authentication failed"
        });
    }
};