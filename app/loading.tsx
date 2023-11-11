import { CircularProgress } from "@mui/material";

// This is the page when SSR is taking place and is the default loading state
export default function Loading() {
    return (
        <main
            style={{ height: "calc(100vh - 50px)" }}
            className="flex justify-center items-center"
        >
            <CircularProgress size={"4rem"} />
        </main>
    );
}
