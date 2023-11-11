import prisma from "@/app/services/db";
import { notFound } from "next/navigation";
import Header from "../components/header";
import ReservationForm from "../components/reservation_form";

const findRestaurantBySlug = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
        },
    });
    if (!restaurant) {
        return notFound();
    }
    return restaurant;
};

export default async function ReservePage({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { date: string; partySize: string };
}) {
    const restaurant = await findRestaurantBySlug(params.slug);
    const [day, time] = searchParams.date.split("T");
    return (
        <>
            <div className="border-t h-screen">
                <div className="py-9 w-3/5 m-auto">
                    <Header
                        name={restaurant.name}
                        main_image={restaurant.main_image}
                        date={searchParams.date}
                        partySize={searchParams.partySize}
                    />
                    <ReservationForm
                        day={day}
                        time={time}
                        partySize={searchParams.partySize}
                        slug={params.slug}
                    />
                </div>
            </div>
        </>
    );
}
