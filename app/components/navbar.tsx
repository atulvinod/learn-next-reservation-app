"use client";
import Link from "next/link";
import LoginModal from "./auth/login_modal";
import SignupModal from "./auth/signup_modal";
import { useContext } from "react";
import { authContext } from "../context/auth_context";

export default function NavBar() {
    const { user } = useContext(authContext);
    return (
        <nav className="bg-white p-2 flex justify-between">
            <Link href="/" className="font-bold text-gray-700 text-2xl">
                {" "}
                OpenTable{" "}
            </Link>
            <div>
                {!user ? (
                    <div className="flex">
                        <LoginModal />
                        <SignupModal />
                    </div>
                ) : (
                    <span>{JSON.stringify(user)}</span>
                )}
            </div>
        </nav>
    );
}
