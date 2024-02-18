import jwt from "jsonwebtoken";
import type { IUser } from "../models/User.ts";

export function createAcessToken(payload: object) {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.SECRET_WORD!,
            {
                expiresIn: 3600,
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token ?? "");
            },
        );
    });
}

export function authenticateToken(token: string) {
    return new Promise<IUser>((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_WORD!, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded as IUser);
        });
    });
}
