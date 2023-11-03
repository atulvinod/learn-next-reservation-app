import Link from "next/link";
import Header from "./components/header";
import RestaurantCard from "./components/restaurant_card";
import NavBar from "./components/navbar";

export default function Home() {
    return (
        <main>
            <Header />
            <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
                <RestaurantCard />
            </div>
        </main>
    );
}
