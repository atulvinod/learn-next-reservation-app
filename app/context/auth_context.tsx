"use client";
import { getCookie } from "cookies-next";
import React, { useState, createContext, useEffect } from "react";
import { default as axios } from "axios";
import { StatusCodes } from "http-status-codes";

export interface AuthUser {
    firstName: string;
    lastName: string;
    email: string;
    id: number;
    jwt: string;
}

interface State {
    user: AuthUser | null;
    isLoadingAuth: boolean;
}

interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const authContext = createContext<AuthState>({
    isLoadingAuth: false,
    user: null,
    setAuthState: () => {},
});

export default function AuthContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const [state, setAuthState] = useState<State>({
        isLoadingAuth: true,
        user: null,
    });

    const getUserFromCookie = async () => {
        const token = getCookie("jwt");
        if (token) {
            setAuthState({ ...state, isLoadingAuth: true });
            const response = await axios.get<{ data: AuthUser }>(
                `/api/auth/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status == StatusCodes.OK) {
                setAuthState({
                    user: response.data.data,
                    isLoadingAuth: false,
                });
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
            }
        }
        setAuthState({ ...state, isLoadingAuth: false });
    };

    useEffect(() => {
        getUserFromCookie();
    }, []);


    return (
        <authContext.Provider value={{ ...state, setAuthState: setAuthState }}>
            {children}
        </authContext.Provider>
    );
}
