export type OE<T> = T | ErrorResponse;

export type BaseResponse = {
    message: string;
};

export type ErrorResponse = {
    errors?: string[];
} & BaseResponse;
