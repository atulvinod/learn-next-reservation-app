import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type SearchResultType = {
    id: Number;
    name: string;
    main_image: string;
    price: PRICE;
    location: Location;
    cuisine: Cuisine;
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    if (!query) {
        return Response.error();
    }
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

const findRestaurants = async (
    searchQuery: string
): Promise<SearchResultType[]> => {
    const restaurants = await prisma.restaurant.findMany({
        where: {
            name: {
                contains: searchQuery,
                mode: "insensitive",
            },
        },
        select: {
            id: true,
            name: true,
            main_image: true,
            price: true,
            location: true,
            cuisine: true,
        },
    });
    return restaurants;
};
