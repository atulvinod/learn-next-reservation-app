import NavBar from "@/app/components/navbar";
import RestaurantTitle from "../components/title";
import Menu from "./components/menu";
import RestaurantNav from "../components/restaurant_nav";
import Header from "../components/header";

export default function MenuPage() {
    return (
        <>
            <div className="bg-white w-[100%] rounded p-3 shadow">
                <RestaurantNav />
                <Menu />
            </div>
        </>
    );
}
