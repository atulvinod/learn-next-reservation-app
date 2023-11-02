import NavBar from "../components/navbar";
import SearchBarHeader from "./components/search_bar_header";
import SearchResult from "./components/search_result";
import SearchSideBar from "./components/sidebar";

export default function SearchPage() {
    return (
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">
                {/* NAVBAR */}
                <NavBar />
                {/* HEADER */}
                <SearchBarHeader />
                <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                    <SearchSideBar />

                    <div className="w-5/6">
                        <SearchResult />
                    </div>
                </div>
            </main>
        </main>
    );
}
