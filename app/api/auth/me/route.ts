import { decryptToken, getUser } from "@/app/services/user";
import { StatusCodes } from "http-status-codes";
import { NextRequest } from "next/server";
import { handleError } from "../../error_handler";

export async function GET(request: NextRequest) {
    try {
        const authorization = request.headers.get("Authorization");
        const token = authorization?.split(" ")[1];
        const decryptedToken = decryptToken(token!!);
        return Response.json({ data: decryptedToken, message: "Success" });
    } catch (error) {
        return handleError(error as Error);
    }
}
