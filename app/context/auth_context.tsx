"use client";
import React, { useState, createContext } from "react";

export interface AuthUser {
    firstName: string;
    lastName: string;
    email: string;
    id: number;
    jwt: string;
}

interface State {
    user: AuthUser | null;
}

interface AuthState extends State {
    setUser: React.Dispatch<React.SetStateAction<State>>;
}

export const authContext = createContext<AuthState>({
    user: null,
    setUser: () => {},
});

export default function AuthContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const [state, setUser] = useState<State>({
        user: null,
    });

    return (
        <authContext.Provider value={{ ...state, setUser }}>
            {children}
        </authContext.Provider>
    );
}
