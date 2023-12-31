import { handleError } from "@/app/api/error_handler";
import RequestError from "@/app/models/request_error";
import prisma from "@/app/services/db";
import {
    searchTimeWithTables,
    getAvailableTables,
} from "@/app/services/restaurant";
import { StatusCodes } from "http-status-codes";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params: { slug } }: { params: { slug: string } }
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

        const availabilities = await getAvailableTables({
            slug,
            time,
            day,
            partySize,
        });

        return Response.json({ data: { availabilities } });
    } catch (error) {
        return handleError(error as Error);
    }
}
