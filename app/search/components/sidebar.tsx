import { getCuisines, getLocations } from "@/app/services/restaurant";
import { PRICE } from "@prisma/client";
import Link from "next/link";
import React from "react";

async function getSideBarData() {
    return Promise.all([getLocations(), getCuisines()]);
}

export default async function SearchSideBar({
    searchParams,
}: {
    searchParams: {
        cuisine: number;
        price: string;
    };
}) {
    const [regions, cuisines] = await getSideBarData();

    const prices: { type: PRICE; className: string; text: string }[] = [
        {
            type: PRICE.CHEAP,
            className:
                "border w-full text-reg font-light text-center rounded-l p-2",
            text: "$",
        },
        {
            type: PRICE.REGULAR,
            className:
                "border w-full text-reg font-light text-center rounded-l p-2",
            text: "$$",
        },
        {
            type: PRICE.EXPENSIVE,
            className:
                "border w-full text-reg font-light text-center rounded-l p-2",
            text: "$$$",
        },
    ];

    return (
        <div className="w-1/5 mr-4">
            <div className="border-b pb-4 flex flex-col">
                <h1 className="mb-2">Region</h1>
                {regions.map((region) => (
                    <Link
                        href={{
                            href: "/search",
                            query: {
                                ...searchParams,
                                query: region.name,
                            },
                        }}
                        className="font-light text-reg capitalize"
                        key={region.id}
                    >
                        {region.name}
                    </Link>
                ))}
            </div>
            <div className="border-b pb-4 mt-3 flex flex-col">
                <h1 className="mb-2">Cuisine</h1>
                {cuisines.map((cuisine) => (
                    <Link
                        href={{
                            href: "/search",
                            query: {
                                ...searchParams,
                                cuisine: cuisine.id,
                            },
                        }}
                        className="font-light text-reg capitalize"
                        key={cuisine.id}
                    >
                        {cuisine.name}
                    </Link>
                ))}
            </div>
            <div className="mt-3 pb-4">
                <h1 className="mb-2">Price</h1>
                <div className="flex">
                    {prices.map(({ className, type, text }, index) => {
                        return (
                            <Link
                                key={index}
                                href={{
                                    href: "/search",
                                    query: {
                                        ...searchParams,
                                        price: type,
                                    },
                                }}
                                className={className}
                            >
                                {text}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
