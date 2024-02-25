import { z } from "zod";

const errorMsg = {
    email_required: "A valid email is required.",
    password_required: "A valid password is required.",
    password_min: "Password must be at least 6 characters long.",
    username_required: "A valid username is required.",
    username_min: "Username must be at least 3 characters long.",
};

export const userSchema = z.object({
    _id: z.string(),
    email: z.string().email({
        message: errorMsg.email_required,
    }),
    password: z.string().min(6, {
        message: errorMsg.password_min,
    }),
    username: z.string().min(3, {
        message: errorMsg.username_min,
    }),
    profilePhoto: z.string(),
    profileDescription: z.string(),
});

export const registerSchema = userSchema.pick({
    email: true,
    password: true,
    username: true,
});

export const loginSchema = userSchema.pick({
    email: true,
    password: true,
});
