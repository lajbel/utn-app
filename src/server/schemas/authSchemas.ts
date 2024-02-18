import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
        required_error: "A valid username is required.",
    }),
    email: z
        .string({
            required_error: "A valid email is required.",
        })
        .email({
            message: "A valid email is required.",
        }),
    password: z
        .string({
            required_error: "A valid password is required.",
        })
        .min(6, {
            message: "Password must be at least 6 characters long.",
        }),
});

export const loginSchema = z.object({
    email: z
        .string({
            required_error: "A valid email is required.",
        })
        .email({
            message: "A valid email is required.",
        }),
    password: z
        .string({
            required_error: "A valid password is required.",
        })
        .min(6, {
            message: "Password must be at least 6 characters long.",
        }),
});
