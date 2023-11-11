import { useState } from "react";
import axios from "axios";
import { reserveRequest } from "@/app/services/validation_schemas";

export default function useReservation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createReservation = async ({
        slug,
        partySize,
        day,
        time,
        reserveRequest,
    }: {
        slug: string;
        partySize: string;
        day: string;
        time: string;
        reserveRequest: reserveRequest;
    }) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `/api/restaurants/${slug}/reserve`,
                reserveRequest,
                {
                    params: {
                        partySize,
                        day,
                        time,
                    },
                }
            );
            setLoading(false);
            return response.data;
        } catch (error: any) {
            setLoading(false);
            setError(error.response.data.errorMessage);
        }
    };

    return { loading, error, createReservation };
}
