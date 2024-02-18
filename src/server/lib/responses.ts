import { Response } from "express";

export function respondWithMessage<T extends Response>(
    res: T,
    statusCode: number,
    message: string,
) {
    return res.status(statusCode).json({
        message,
    });
}

export function resServerErrorWithMessage<T extends Response>(
    res: T,
    message: string,
) {
    return res.status(500).json({
        message,
    });
}

export function resBadRequest<T extends Response>(res: T, message: string) {
    return res.status(400).json({
        message,
        errors: [message],
    });
}

export function resInternalServerError<T extends Response>(res: T) {
    return res.status(500).json({
        message: "Internal server error",
    });
}
