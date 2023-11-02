import NavBar from "@/app/components/navbar";
import RestaurantTitle from "../components/title";
import Menu from "./components/menu";

export default function MenuPage() {
    return (
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">
                <NavBar />
                <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
                    <div className="bg-white w-[100%] rounded p-3 shadow">
                        <Menu />
                    </div>
                </div>
            </main>
        </main>
    );
}
