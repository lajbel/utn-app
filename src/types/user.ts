import type * as express from "express";
import type { OE } from "./responses.ts";
import type { MongooseSchema } from "./utils.ts";

// Type
export type User = MongooseSchema<{
    email: string;
    password: string;
    username: string;
    profilePhoto: string;
    profileDescription: string;
}>;

export type UserWithoutPassword = Omit<User, "password">;
export type UserForRegister = Pick<User, "email" | "password" | "username">;
export type UserForLogin = Pick<User, "email" | "password">;

// Responses
export type UserResponse = OE<{ user: UserWithoutPassword }>;

// Requests
export type RegisterRequest = express.RequestHandler<
    {},
    UserResponse,
    UserForRegister
>;

export type LoginRequest = express.RequestHandler<
    {},
    UserResponse,
    UserForLogin
>;

export type VerifyRequest = express.RequestHandler<
    {},
    UserResponse,
    {}
>;

export type GetUserRequest = express.RequestHandler<
    { id: string },
    UserResponse
>;
