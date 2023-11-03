import Header from "./components/header";
import NavBar from "../components/navbar";
import ReservationForm from "./components/reservation_form";

export default function ReservePage() {
    return (
        <>
            <div className="border-t h-screen">
                <div className="py-9 w-3/5 m-auto">
                    <Header />
                    <ReservationForm />
                </div>
            </div>
        </>
    );
}
