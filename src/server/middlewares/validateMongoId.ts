import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export const validateMongoId = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid mongodb id",
        });
    }

    next();
};
