"use client";
import SearchBarHeader from "./components/search_bar_header";
import SearchResult from "./components/search_result";
import SearchSideBar from "./components/sidebar";
import { useEffect, useState } from "react";
import { SearchResultType } from "../api/restaurants/search/route";

async function findRestaurants(
    searchQuery: string
): Promise<SearchResultType[]> {
    const response = await fetch(
        `/api/restaurants/search?query=${searchQuery}`
    );
    if (response.ok) {
        const jsonData = await response.json();
        return jsonData.data;
    }
    return [];
}

export default function SearchPage({
    searchParams,
}: {
    searchParams: { query: string };
}) {
    const [restaurants, setRestaurants] = useState<SearchResultType[]>([]);

    function executeSearch(query: string) {
        findRestaurants(query).then((results) => {
            setRestaurants([...results]);
        });
    }

    useEffect(() => {
        executeSearch(searchParams.query);
    }, [searchParams.query]);

    return (
        <>
            <SearchBarHeader
                query={searchParams.query}
                onSearch={executeSearch}
            />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar />
                <div className="w-5/6">
                    {restaurants.map((restaurant) => {
                        return (
                            <SearchResult
                                key={restaurant.id}
                                details={restaurant}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}
