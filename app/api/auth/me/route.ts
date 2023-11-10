import { decryptToken } from "@/app/services/user";
import { StatusCodes } from "http-status-codes";
import { NextRequest } from "next/server";
import { handleError } from "../../error_handler";

export async function GET(request: NextRequest) {
    try {
        const authorization = request.headers.get("Authorization");
        if (!authorization) {
            return Response.json(
                { error: "Authorization header not set" },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        const token = authorization?.split(" ")[1];
        if (!token) {
            return Response.json(
                { error: "Token is required" },
                { status: StatusCodes.BAD_REQUEST }
            );
        }
        const decryptedToken = decryptToken(token);
        return Response.json({ data: decryptedToken, message: "Success" });
    } catch (error) {
        return handleError(error as Error);
    }
}
