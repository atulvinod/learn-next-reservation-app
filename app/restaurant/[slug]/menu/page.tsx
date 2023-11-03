import NavBar from "@/app/components/navbar";
import RestaurantTitle from "../components/title";
import Menu from "./components/menu";
import MenuTitle from "./components/menu_title";
import RestaurantNav from "../components/restaurant_nav";

export default function MenuPage() {
    return (
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">
                <NavBar />
                <MenuTitle />
                <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
                    <div className="bg-white w-[100%] rounded p-3 shadow">
                        <RestaurantNav />
                        <Menu />
                    </div>
                </div>
            </main>
        </main>
    );
}
