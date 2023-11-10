import { attemptUserLogin } from "@/app/services/user";
import { NextRequest } from "next/server";
import { handleError } from "../../error_handler";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    const requestBody = await request.json();
    try {
        const result = await attemptUserLogin(requestBody);
        cookies().set("jwt", result.jwt);
        return Response.json({ message: "Login successful", data: result });
    } catch (error) {
        return handleError(error as Error);
    }
}
