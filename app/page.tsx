import Link from "next/link";
import Header from "./components/header";
import RestaurantCard from "./components/restaurant_card";
import NavBar from "./components/navbar";

export default function Home() {
    return (
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">
                <NavBar />
                <main>
                    <Header />
                    <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
                        <RestaurantCard />
                    </div>
                </main>
            </main>
        </main>
    );
}
