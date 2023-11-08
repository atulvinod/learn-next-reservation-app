import React from "react";
import Header from "./components/header";

// This is the page when SSR is taking place and is the default loading state
export default function Loading() {
    return (
        <main>
            <p>Loading</p>
        </main>
    );
}
