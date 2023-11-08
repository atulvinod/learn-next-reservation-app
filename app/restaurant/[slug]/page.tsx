import RestaurantNav from "./components/restaurant_nav";
import Rating from "./components/rating";
import Description from "./components/description";
import Images from "./components/images";
import Reviews from "./components/reviews";
import Reservation from "./components/reservation";
import { PrismaClient, Review, User } from "@prisma/client";
import prisma from "@/app/services/db";

const fetchRestaurant = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        select: {
            id: true,
            name: true,
            images: true,
            description: true,
            slug: true,
            reviews: {
                include: {
                    user: true,
                },
            },
        },
        where: {
            slug,
        },
    });

    return restaurant;
};

// route params are passed as props to our component
export default async function RestaurantDetailsPage({
    params,
}: {
    params: { slug: string };
}) {
    const restaurant = await fetchRestaurant(params.slug);
    return (
        <>
            <div className="bg-white w-[70%] rounded p-3 shadow">
                <RestaurantNav slug={params.slug} />
                <div className="mt-4 border-b pb-6">
                    <h1 className="font-bold text-6xl">
                        {restaurant?.name ?? ""}
                    </h1>
                </div>
                <Rating reviews={restaurant?.reviews ?? []} />
                <Description description={restaurant?.description ?? ""} />
                <Images images={restaurant?.images ?? []} />
                <Reviews reviews={restaurant?.reviews ?? []} />
            </div>
            <div className="w-[27%] relative text-reg">
                <Reservation />
            </div>
        </>
    );
}
