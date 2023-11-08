import SearchBarHeader from "./components/search_bar_header";
import SearchResult from "./components/search_result";
import SearchSideBar from "./components/sidebar";
import { findRestaurants } from "../services/restaurant";
import { PRICE } from "@prisma/client";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: {
        query: string;
        cuisine: number;
        price: PRICE;
    };
}) {
    const query = searchParams.query;
    const cuisine = searchParams.cuisine;
    const price = searchParams.price;

    const restaurants = await findRestaurants(query, price, cuisine);

    return (
        <>
            <SearchBarHeader query={query} />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar searchParams={searchParams} />
                <div className="w-5/6">
                    {restaurants.length ? (
                        restaurants.map((restaurant) => {
                            return (
                                <SearchResult
                                    key={restaurant.id}
                                    restaurant={restaurant}
                                />
                            );
                        })
                    ) : (
                        <p>No restaurants found</p>
                    )}
                </div>
            </div>
        </>
    );
}
