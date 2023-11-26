import { Request } from "express";

export type RequestWithParams<P> = Request<P, {}, {}, {}>;

export type RequestWithBody<B> = Request<{}, {}, B, {}>;

export type RequestWithBodyAndParams<P, B> = Request<P, {}, B, {}>;

export type ErrorsMessages = {
    message: string
    field: string
};

export type ErrorType = {
    errorsMessages: ErrorsMessages[]
};