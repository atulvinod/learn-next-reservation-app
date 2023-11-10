"use client";
import Link from "next/link";
import LoginModal from "./auth/login_modal";
import SignupModal from "./auth/signup_modal";
import { useContext } from "react";
import { authContext } from "../context/auth_context";
import { Skeleton } from "@mui/material";
export default function NavBar() {
    const { user, setAuthState, isLoadingAuth } = useContext(authContext);
    return (
        <nav className="bg-white p-2 flex justify-between">
            <Link href="/" className="font-bold text-gray-700 text-2xl">
                {" "}
                OpenTable{" "}
            </Link>
            {isLoadingAuth && (
                <Skeleton
                    variant="rounded"
                    width={210}
                    height={33}
                    className="mr-5"
                />
            )}
            {!isLoadingAuth && (
                <div className="mr-10">
                    {!user ? (
                        <div className="flex">
                            <LoginModal />
                            <SignupModal />
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <p className="mr-5">
                                {user.firstName} {user.lastName}
                            </p>
                            <button
                                className="bg-red-700 text-white border p-1 px-4 rounded mr-3"
                                onClick={() => {
                                    setAuthState({
                                        user: null,
                                        isLoadingAuth: false,
                                    });
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
