// ?: Implement logger

import type {
    LoginRequest,
    RegisterRequest,
    User,
    VerifyRequest,
} from "@/types/user.ts";
import bcrypt from "bcryptjs";
import type { RequestHandler, Response } from "express";
import { authenticateToken, createAcessToken } from "../lib/jwt.ts";
import { resBadRequest, resInternalServerError } from "../lib/responses.ts";
import UserModel from "../models/User.ts";

function sendAuthCookie(res: Response, token: string) {
    return res.cookie("token", token, {
        sameSite: "none",
        secure: true,
        httpOnly: false,
    });
}

function createAuthToken(user: User) {
    return createAcessToken({
        email: user.email,
        username: user.username,
        id: user._id,
    });
}

export const register: RegisterRequest = async (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return resBadRequest(res, "Please enter all fields");
    }
    try {
        const foundUser = (await UserModel.findOne({ email }))
            || (await UserModel.findOne({ username }));

        if (foundUser) {
            return resBadRequest(res, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await new UserModel({
            email,
            password: hashedPassword,
            username,
        }).save();

        const token = await createAuthToken(newUser);
        sendAuthCookie(res, token);

        res.status(200).json({
            message: "User registered successfully",
            user: newUser.toObject(),
        });
    }
    catch (e) {
        console.log(e);
        return resInternalServerError(res);
    }
};

export const login: LoginRequest = async (req, res) => {
    const { email, password } = req.body;

    try {
        const foundUser = await UserModel.findOne({ email });
        if (!foundUser) return resBadRequest(res, "User doesn't exist");

        const passwordMatch = await bcrypt.compare(
            password,
            foundUser.password,
        );
        if (!passwordMatch) return resBadRequest(res, "Invalid credentials");

        const token = await createAuthToken(foundUser);
        sendAuthCookie(res, token);

        return res.status(200).json({
            message: "User logged in successfully",
            user: { ...foundUser.toObject() },
        });
    }
    catch (e) {
        console.log(e);
        return resInternalServerError(res);
    }
};

export const logout: RequestHandler = async (req, res) => {
    res.cookie("token", "", {
        secure: true,
        httpOnly: false,
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const verify: VerifyRequest = async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const userFromToken = await authenticateToken(token);

        if (!userFromToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const foundUser = await UserModel.findById(userFromToken.id, {
            password: 0,
        });

        if (!foundUser) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        return res.status(200).json({
            message: "Authorized",
            user: foundUser,
        });
    }
    catch (e) {
        return res.cookie("token", "").json({ message: "Unauthorized" });
    }
};
