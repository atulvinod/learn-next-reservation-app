import { decryptTokenAndGetEmail, getUser } from "@/app/services/user";
import { StatusCodes } from "http-status-codes";
import { NextRequest } from "next/server";
import { handleError } from "../../error_handler";
import RequestError from "@/app/models/request_error";

export async function GET(request: NextRequest) {
    try {
        const authorization = request.headers.get("Authorization");
        const token = authorization?.split(" ")[1];
        const email = decryptTokenAndGetEmail(token!!);
        const user = await getUser(email);
        if (!user) {
            throw new RequestError("No user found", StatusCodes.NOT_FOUND);
        }
        return Response.json({
            data: {
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                id: user.id,
            },
            message: "Success",
        });
    } catch (error) {
        return handleError(error as Error);
    }
}
