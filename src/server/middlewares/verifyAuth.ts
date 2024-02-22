import { RequestHandler } from "express";
import { authenticateToken } from "../lib/jwt.ts";

export const verifyAuth: RequestHandler = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decodedUser = await authenticateToken(token);
        req.user = decodedUser;
        next();
    }
    catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid token" });
    }
};
