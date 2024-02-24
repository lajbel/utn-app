import { configDotenv } from "dotenv";
import { z } from "zod";

const envScheme = z.object({
    PORT: z.string(),
    MONGODB_URI: z.string(),
    SECRET_WORD: z.string(),
    FIREBASE_API_KEY: z.string(),
    FIREBASE_AUTH_DOMAIN: z.string(),
    FIREBASE_PROJECT_ID: z.string(),
    FIREBASE_STORAGE_BUCKET: z.string(),
    FIREBASE_MESSAGING_SENDER_ID: z.string(),
    FIREBASE_APP_ID: z.string(),
});

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envScheme> {}
    }
}

configDotenv({
    path: ".env",
});

export const PORT = Number(process.env.PORT) || 3000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const SECRET_WROD = process.env.SECRET_WORD;
export const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
export const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN;
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
export const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET;
export const FIREBASE_MESSAGING_SENDER_ID =
    process.env.FIREBASE_MESSAGING_SENDER_ID;
export const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID;
