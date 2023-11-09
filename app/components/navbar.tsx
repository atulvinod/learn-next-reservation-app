"use client";
import Link from "next/link";
import LoginModal from "./auth/login_modal";
import SignupModal from "./auth/signup_modal";

export default function NavBar() {
    return (
        <nav className="bg-white p-2 flex justify-between">
            <Link href="/" className="font-bold text-gray-700 text-2xl">
                {" "}
                OpenTable{" "}
            </Link>
            <div>
                <div className="flex">
                    <LoginModal />
                    <SignupModal />
                </div>
            </div>
        </nav>
    );
}
