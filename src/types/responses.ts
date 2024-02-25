export type BaseResponse = {
    message: string;
};

export type Response<T> = T & BaseResponse;

export type ErrorResponse = {
    errors?: string[];
} & BaseResponse;
