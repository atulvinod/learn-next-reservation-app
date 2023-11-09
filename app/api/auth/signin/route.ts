import RequestError from "@/app/models/request_error";
import { attemptUserLogin } from "@/app/services/user";
import { validateLoginBody } from "@/app/services/validation_schemas";
import { NextRequest } from "next/server";
import { ValidationError } from "yup";
import { handleError } from "../../error_handler";

export async function POST(request: NextRequest) {
    const requestBody = await request.json();
    try {
        await validateLoginBody(requestBody);
        const result = await attemptUserLogin(
            requestBody.email,
            requestBody.password
        );
        return Response.json({ message: "Login successful", data: result });
    } catch (error) {
        return handleError(error as Error);
    }
}
