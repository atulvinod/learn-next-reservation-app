import { times } from "@/data";
import { PRICE, Table } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import RequestError from "../models/request_error";
import prisma from "./db";
import { Cuisines, Locations, SearchResultType } from "./types";

export async function findRestaurants(
    location?: string | undefined | null,
    price?: PRICE | null,
    cuisine_id?: number | null
): Promise<SearchResultType[]> {
    const selectClause = {
        id: true,
        name: true,
        main_image: true,
        price: true,
        location: true,
        cuisine: true,
        slug: true,
        reviews: true,
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

export const searchTimeWithTables = async ({
    time,
    day,
    restaurant,
}: {
    time: string;
    day: string;
    restaurant: {
        tables: Table[];
        open_time: string;
        close_time: string;
    };
}) => {
    const searchTimes = times.find((t) => {
        return t.time === time;
    })?.searchTimes;

    if (!searchTimes) {
        throw new RequestError(
            "Invalid data provided",
            StatusCodes.BAD_REQUEST
        );
    }

    const bookings = await prisma.booking.findMany({
        where: {
            booking_time: {
                gte: new Date(`${day}T${searchTimes[0]}`),
                lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
            },
        },
        select: {
            number_of_booking: true,
            booking_time: true,
            bookings_on_tables: true,
        },
    });

    const bookingTablesObj: { [key: string]: { [key: number]: true } } = {};

    bookings.forEach((booking) => {
        bookingTablesObj[booking.booking_time.toISOString()] =
            booking.bookings_on_tables.reduce((obj, table) => {
                return {
                    ...obj,
                    [table.table_id]: true,
                };
            }, {});
    });

    const tables = restaurant.tables;

    const searchTimesWithTables = searchTimes.map((searchTime) => {
        return {
            date: new Date(`${day}T${searchTime}`),
            time: searchTime,
            tables,
        };
    });

    searchTimesWithTables.forEach((t) => {
        t.tables = t.tables.filter((table) => {
            if (bookingTablesObj[t.date.toISOString()]) {
                if (bookingTablesObj[t.date.toISOString()][table.id])
                    return false;
            }
            return true;
        });
    });

    return searchTimesWithTables;
};

export const getAvailableTables = async ({
    slug,
    time,
    day,
    partySize,
}: {
    slug: string;
    time: string;
    day: string;
    partySize: string;
}) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
        },
        select: {
            tables: true,
            open_time: true,
            close_time: true,
        },
    });

    if (!restaurant) {
        throw new RequestError(
            "Invalid data provided",
            StatusCodes.BAD_REQUEST
        );
    }

    const availableTables = await searchTimeWithTables({
        time,
        day,
        restaurant,
    });

    const availabilities = availableTables
        .map((t) => {
            const sumSeats = t.tables.reduce((sum, table) => {
                return sum + table.seats;
            }, 0);
            return {
                time: t.time,
                available: sumSeats >= parseInt(partySize),
            };
        })
        .filter((av) => {
            const timeIsAfterOpeningHour =
                new Date(`${day}T${av.time}`) >=
                new Date(`${day}T${restaurant.open_time}`);
            const timeIsBeforeClosingHour =
                new Date(`${day}T${av.time}`) <=
                new Date(`${day}T${restaurant.close_time}`);
            return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
        });

    return availabilities;
};

export const createReservation = async ({
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
}: {
    slug: string;
    day: string;
    time: string;
    bookerEmail: string;
    bookerFirstName: string;
    bookerLastName: string;
    bookerPhone: string;
    bookerOccasion: string;
    bookerRequest: string;
    partySize: string;
}) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
        },
        select: {
            id: true,
            tables: true,
            open_time: true,
            close_time: true,
        },
    });

    if (!restaurant) {
        throw new RequestError("No restaurant found", StatusCodes.NOT_FOUND);
    }

    if (
        new Date(`${day}T${time}`) <
            new Date(`${day}T${restaurant.open_time}`) ||
        new Date(`${day}T{time}`) > new Date(`${day}T${restaurant.close_time}`)
    ) {
        throw new RequestError("Invalid data provided");
    }

    const availabilities = await searchTimeWithTables({
        time,
        day,
        restaurant,
    });
    const timeWithTable = availabilities.find((e) => {
        return e.date.toISOString() == new Date(`${day}T${time}`).toISOString();
    });

    if (!timeWithTable) {
        throw new RequestError("No Availability", StatusCodes.FORBIDDEN);
    }
    const tablesCount: {
        2: number[];
        4: number[];
    } = { 2: [], 4: [] };

    timeWithTable.tables.forEach((t) => {
        if (t.seats == 2) {
            tablesCount[2].push(t.id);
        } else {
            tablesCount[4].push(t.id);
        }
    });

    const tablesToBook: number[] = [];
    let seatsRemaining = parseInt(partySize);

    while (seatsRemaining > 0) {
        if (seatsRemaining >= 3) {
            if (tablesCount[4].length) {
                tablesToBook.push(tablesCount[4][0]);
                tablesCount[4].shift();
                seatsRemaining -= 4;
            } else {
                tablesToBook.push(tablesCount[2][0]);
                tablesCount[2].shift();
                seatsRemaining -= 2;
            }
        } else {
            if (tablesCount[2].length) {
                tablesToBook.push(tablesCount[2][0]);
                tablesCount[2].shift();
                seatsRemaining -= 2;
            } else {
                tablesToBook.push(tablesCount[4][0]);
                tablesCount[4].shift();
                seatsRemaining -= 4;
            }
        }
    }

    const booking = await prisma.booking.create({
        data: {
            number_of_booking: parseInt(partySize),
            booking_time: new Date(`${day}T${time}`),
            booker_email: bookerEmail,
            booker_phone: bookerPhone,
            booker_first_name: bookerFirstName,
            booker_last_name: bookerLastName,
            restaurant_id: restaurant.id,
            booker_occasion: bookerOccasion,
            booker_request: bookerRequest,
        },
    });

    const bookingsOnTablesData = tablesToBook.map((t_id) => {
        return {
            table_id: t_id,
            booking_id: booking.id,
        };
    });

    await prisma.bookingsOnTables.createMany({
        data: bookingsOnTablesData,
    });

    return booking;
};
