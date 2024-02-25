import {
    loginSchema,
    registerSchema,
    userSchema,
} from "@/schemas/authSchema.ts";
import { RequestHandler } from "express";
import { z } from "zod";
import { ErrorResponse } from "./responses.ts";
import { Response } from "./responses.ts";

// Type
export type User = z.infer<typeof userSchema>;
export type UserForCreate = z.infer<typeof registerSchema>;
export type UserForLogin = z.infer<typeof loginSchema>;

// Responses
export type UserResponse = Response<{ user: User }>;

// Requests
export type RegisterRequest = RequestHandler<
    {},
    UserResponse | ErrorResponse,
    UserForCreate
>;

export type LoginRequest = RequestHandler<
    {},
    UserResponse | ErrorResponse,
    UserForLogin
>;

export type VerifyRequest = RequestHandler<
    {},
    UserResponse | ErrorResponse,
    {}
>;

export type GetUserRequest = RequestHandler<
    { id: string },
    UserResponse | ErrorResponse
>;

export type UpdateUserRequest = RequestHandler<
    { id: string },
    UserResponse | ErrorResponse,
    Partial<User>
>;
