import type { VerifyRequest } from "@/types/Requests.ts";
import { authenticateToken } from "../lib/jwt.ts";

export const verifyAuth: VerifyRequest = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    authenticateToken(token)
        .then((decoded) => {
            // @ts-ignore TODO: Fix this
            req.user = decoded;
            next();
        })
        .catch((err) => {
            console.error(err);
            return res.status(401).json({ message: "Invalid token" });
        });
};
