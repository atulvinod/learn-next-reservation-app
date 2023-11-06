import NavBar from "@/app/components/navbar";
import RestaurantTitle from "../components/title";
import Menu from "./components/menu";
import RestaurantNav from "../components/restaurant_nav";
import Header from "../components/header";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type RestaurantMenuType = {
    items: {
        id: number;
        name: string;
        price: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        restaurant_id: number;
    }[];
};

const fetchRestaurantMenu = async (
    slug: string
): Promise<RestaurantMenuType | null> => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
        },
        select: {
            items: true,
        },
    });
    return restaurant;
};

export default async function MenuPage({
    params,
}: {
    params: { slug: string };
}) {
    const restaurantMenu = await fetchRestaurantMenu(params.slug);

    return (
        <>
            <div className="bg-white w-[100%] rounded p-3 shadow">
                <RestaurantNav slug={params.slug} />
                <Menu items={restaurantMenu ?? {items:[]}} />
            </div>
        </>
    );
}
