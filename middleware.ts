import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const authorization = request.headers.get("Authorization");
    if (!authorization) {
        return NextResponse.json(
            { error: "Authorization header not set" },
            { status: StatusCodes.UNAUTHORIZED }
        );
    }
    const token = authorization?.split(" ")[1];

    if (!token) {
        return NextResponse.json(
            { error: "Token is required" },
            { status: StatusCodes.UNAUTHORIZED }
        );
    }
}

export const config = {
    matcher: ["/api/auth/me"],
};
