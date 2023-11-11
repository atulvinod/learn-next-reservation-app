import { handleError } from "@/app/api/error_handler";
import RequestError from "@/app/models/request_error";
import { createReservation } from "@/app/services/restaurant";
import { StatusCodes } from "http-status-codes";
import { NextRequest } from "next/server";

export async function POST(
    request: NextRequest,
    { params: { slug } }: { params: { slug: string } }
) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const day = searchParams.get("day");
        const time = searchParams.get("time");
        const partySize = searchParams.get("partySize");
        const {
            bookerEmail,
            bookerPhone,
            bookerFirstName,
            bookerLastName,
            bookerOccasion,
            bookerRequest,
        } = await request.json();

        if (!day || !time || !partySize) {
            throw new RequestError(
                "Invalid data provided",
                StatusCodes.BAD_REQUEST
            );
        }

        const booking = await createReservation({
            slug,
            day,
            time,
            partySize,
            bookerEmail,
            bookerFirstName,
            bookerLastName,
            bookerOccasion,
            bookerRequest,
            bookerPhone,
        });
        return Response.json({ message: "Created", data: booking });
    } catch (error: any) {
        return handleError(error as Error);
    }
}
