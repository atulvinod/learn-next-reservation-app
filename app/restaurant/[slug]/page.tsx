import NavBar from "@/app/components/navbar";
import Header from "./components/header";
import RestaurantNav from "./components/restaurant_nav";
import Rating from "./components/rating";
import Description from "./components/description";
import Images from "./components/images";
import Reviews from "./components/reviews";
import Reservation from "./components/reservation";

export default function RestaurantDetailsPage() {
    return (
        <>
            <Header />
            <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
                <div className="bg-white w-[70%] rounded p-3 shadow">
                    <RestaurantNav />
                    <div className="mt-4 border-b pb-6">
                        <h1 className="font-bold text-6xl">Milesstone Grill</h1>
                    </div>
                    <Rating />
                    <Description />
                    <Images />
                    <Reviews />
                </div>
                <Reservation />
            </div>
        </>
    );
}
