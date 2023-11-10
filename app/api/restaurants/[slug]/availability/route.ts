import { handleError } from "@/app/api/error_handler";
import RequestError from "@/app/models/request_error";
import { times } from "@/data";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const day = searchParams.get("day");
        const time = searchParams.get("time");
        const partySize = searchParams.get("partySize");

        if (!day || !time || !partySize) {
            throw new RequestError(
                "Invalid data provided",
                StatusCodes.BAD_REQUEST
            );
        }

        const searchTimes = times.find((t) => {
            return t.time == time;
        })?.searchTimes;

        if (!searchTimes) {
            throw new RequestError(
                "Invalid search time provided",
                StatusCodes.BAD_REQUEST
            );
        }

        return Response.json({ message: "hello" });
    } catch (error) {
        return handleError(error as Error);
    }
}
