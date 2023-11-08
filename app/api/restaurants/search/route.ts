import { findRestaurants } from "@/app/services/restaurant";
import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("location");
    try {
        const result = await findRestaurants(query);
        return Response.json({ data: result });
    } catch (error) {
        return NextResponse.json(
            { error: JSON.stringify(error) },
            { status: 500 }
        );
    }
}

const prisma = new PrismaClient();
