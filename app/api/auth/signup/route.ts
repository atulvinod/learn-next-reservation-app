import { attemptUserSignup } from "@/app/services/user";
import { NextRequest } from "next/server";
import { handleError } from "../../error_handler";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    const requestDetails = await request.json();

    try {
        const signUpResult = await attemptUserSignup(requestDetails);
        cookies().set("jwt", signUpResult.jwt);
        return Response.json({
            message: "Sign-up successful",
            data: signUpResult,
        });
    } catch (error) {
        return handleError(error as Error);
    }
}
