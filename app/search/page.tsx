import NavBar from "../components/navbar";
import SearchBarHeader from "./components/search_bar_header";
import SearchResult from "./components/search_result";
import SearchSideBar from "./components/sidebar";

export default function SearchPage() {
    return (
        <>
            <SearchBarHeader />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar />

                <div className="w-5/6">
                    <SearchResult />
                </div>
            </div>
        </>
    );
}
