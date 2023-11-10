import { NextResponse } from "next/server";
import { ValidationError } from "yup";
import RequestError from "../models/request_error";
import { StatusCodes } from "http-status-codes";

export function handleError(error: Error){
    if (error instanceof ValidationError) {
        return NextResponse.json(
            { error: { [error.path ?? "general_error"]: error.errors } },
            { status: StatusCodes.BAD_REQUEST }
        );
    }
    if (error instanceof RequestError) {
        return NextResponse.json(
            { error: error.message ?? "Unexpected error" },
            { status: error.status ?? StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
    return NextResponse.json(
        { error: error.message ?? "Unexpected error!" },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
}