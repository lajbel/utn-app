import { NextFunction, Request, Response } from "express";

export const bodyFormDataToJSON = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const body = req.body;
    const newBody: any = {};

    Object.keys(body).forEach((key) => {
        if (key.endsWith("[]")) {
            newBody[key.slice(0, -2)] = Array.isArray(body[key])
                ? body[key]
                : [body[key]];
        }
        else if (body[key] === "true") {
            newBody[key] = true;
        }
        else if (body[key] === "false") {
            newBody[key] = false;
        }
        else if (body[key] === "null") {
            newBody[key] = null;
        }
        else if (body[key] === "undefined") {
            newBody[key] = undefined;
        }
        else if (body[key] === "") {
            newBody[key] = null;
        }
        else {
            newBody[key] = body[key];
        }
    });

    req.body = newBody;

    next();
};
