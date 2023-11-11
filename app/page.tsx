import { Cuisine, Location, PRICE, PrismaClient, Review } from "@prisma/client";
import Header from "./components/header";
import RestaurantCard from "./components/restaurant_card";
import prisma from "./services/db";
import Loading from "./loading";

export interface RestaurantCardType {
    id: Number;
    name: string;
    main_image: string;
    location: Location;
    cuisine: Cuisine;
    price: PRICE;
    slug: string;
    reviews: Review[];
}

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
    const restaurants = await prisma.restaurant.findMany({
        select: {
            id: true,
            name: true,
            main_image: true,
            location: true,
            cuisine: true,
            price: true,
            slug: true,
            reviews: true,
        },
    });
    return restaurants;
};

export default async function Home() {
    const restaurants = await fetchRestaurants();
    return (
        <main>
            <Header />
            <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
                {restaurants.map((restaurant, index) => {
                    return (
                        <RestaurantCard key={index} restaurant={restaurant} />
                    );
                })}
            </div>
        </main>
    );
}
