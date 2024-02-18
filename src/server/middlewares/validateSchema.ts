import type { RequestHandler } from "express";
import type { ZodObject, ZodRawShape } from "zod";

function validateSchema<T extends ZodRawShape>(schema: ZodObject<T>) {
    const validateSchemaMiddleWare: RequestHandler = (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error: any) {
            const errorMessages = error.errors.map((err: any) => err.message);

            return res.status(400).json({
                status: 400,
                message: "Validation error",
                errors: errorMessages,
            });
        }
    };

    return validateSchemaMiddleWare;
}

export {
    validateSchema,
};
