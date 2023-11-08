import { findRestaurants } from "@/app/services/restaurant";
import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("location");
    const price = searchParams.get("price");
    const cuisine = searchParams.get("cuisine_id");
    try {
        const result = await findRestaurants(
            query,
            price as PRICE,
            cuisine ? Number(cuisine) : null
        );
        return Response.json({ data: result });
    } catch (error) {
        return NextResponse.json(
            { error: JSON.stringify(error) },
            { status: 500 }
        );
    }
}
