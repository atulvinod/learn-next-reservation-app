import Header from "./components/header";
import NavBar from "../components/navbar";
import ReservationForm from "./components/reservation_form";

export default function ReservePage() {
    return (
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">
                <NavBar />
                <div className="border-t h-screen">
                    <div className="py-9 w-3/5 m-auto">
                        <Header />
                        <ReservationForm />
                    </div>
                </div>
            </main>
        </main>
    );
}
