import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";
import { Cuisines, Locations, SearchResultType } from "./types";

const prisma = new PrismaClient();

export async function findRestaurants(
    location: string | undefined | null,
    price: PRICE | null,
    cuisine_id: number | null
): Promise<SearchResultType[]> {
    const selectClause = {
        id: true,
        name: true,
        main_image: true,
        price: true,
        location: true,
        cuisine: true,
        slug: true,
    };

    if (!location) {
        return prisma.restaurant.findMany({ select: selectClause });
    }
    const whereClause: {
        location?: { name: { contains: string } };
        price?: { equals: PRICE };
        cuisine?: { id: { equals: number } };
    } = {};
    if (location) {
        whereClause["location"] = {
            name: { contains: location.toLowerCase() },
        };
    }
    if (price) {
        whereClause["price"] = { equals: price };
    }
    if (cuisine_id) {
        whereClause["cuisine"] = {
            id: {
                equals: Number(cuisine_id),
            },
        };
    }
    const restaurants = await prisma.restaurant.findMany({
        where: whereClause,
        select: selectClause,
    });
    return restaurants;
}

export async function getLocations(): Promise<Locations[]> {
    return prisma.location.findMany({
        select: {
            id: true,
            name: true,
        },
    });
}

export async function getCuisines(): Promise<Cuisines[]> {
    return prisma.cuisine.findMany({
        select: {
            id: true,
            name: true,
        },
    });
}
