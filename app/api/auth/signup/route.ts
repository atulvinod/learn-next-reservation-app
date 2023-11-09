import RequestError from "@/app/models/request_error";
import { attemptUserSignup } from "@/app/services/user";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { ValidationError } from "yup";
import { handleError } from "../../error_handler";

export async function POST(request: NextRequest) {
    const requestDetails = await request.json();

    try {
        const signUpResult = await attemptUserSignup(requestDetails);
        return Response.json({
            message: "Sign-up successful",
            data: signUpResult,
        });
    } catch (error) {
        return handleError(error as Error);
    }
}
