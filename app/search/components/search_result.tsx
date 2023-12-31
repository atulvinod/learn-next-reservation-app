import Price from "@/app/components/price";
import Stars from "@/app/components/stars";
import { SearchResultType } from "@/app/services/types";
import Link from "next/link";
import React from "react";

export default function SearchResult({
    restaurant,
}: {
    restaurant: SearchResultType;
}) {
    return (
        <div className="border-b flex pb-5">
            <img src={restaurant.main_image} alt="" className="w-44 rounded" />
            <div className="pl-5">
                <h2 className="text-3xl">{restaurant.name}</h2>
                <div className="flex items-start">
                    <div className="flex mb-2">
                        <Stars reviews={restaurant.reviews} />
                    </div>
                </div>
                <div className="mb-9">
                    <div className="font-light flex text-reg">
                        <p className="mr-4">
                            <Price price={restaurant.price} />
                        </p>
                        <p className="mr-4 capitalize">
                            {restaurant.cuisine.name}
                        </p>
                        <p className="mr-4 capitalize">
                            {restaurant.location.name}
                        </p>
                    </div>
                </div>
                <div className="text-red-600">
                    <Link href={`/restaurant/${restaurant.slug}`}>
                        View more information
                    </Link>
                </div>
            </div>
        </div>
    );
}
