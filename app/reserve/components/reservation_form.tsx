"use client";
import { reserveSchema } from "@/app/services/validation_schemas";
import useReservation from "@/hooks/useReservation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, CircularProgress, Input } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormState = {
    bookerFirstName: string;
    bookerLastName: string;
    bookerPhone: string;
    bookerEmail: string;
    bookerOccasion?: string;
    bookerRequest?: string;
};

export default function ReservationForm({
    slug,
    partySize,
    day,
    time,
}: {
    slug: string;
    partySize: string;
    day: string;
    time: string;
}) {
    const {
        handleSubmit,
        register,
        formState: { errors, isValid },
    } = useForm<FormState>({
        mode: "all",
        resolver: yupResolver(reserveSchema),
    });

    const { loading, createReservation, error } = useReservation();
    const [isBookingCompleted, setBookingComplete] = useState(false);
    const submitHandler: SubmitHandler<FormState> = async (reserveRequest) => {
        const result = await createReservation({
            slug,
            partySize,
            day,
            time,
            reserveRequest,
        });
        if (result) {
            setBookingComplete(true);
        }
    };

    return (
        <div className="mt-10 flex flex-wrap justify-between w-[660px]">
            {isBookingCompleted ? (
                <div>
                    <p>Your booking is done!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(submitHandler)}>
                    <Input
                        type="text"
                        className="border rounded p-3 w-80 mb-4 mr-4"
                        placeholder="First name"
                        {...register("bookerFirstName")}
                        error={Boolean(errors?.bookerFirstName)}
                    />
                    <Input
                        type="text"
                        className="border rounded p-3 w-80 mb-4"
                        placeholder="Last name"
                        {...register("bookerLastName")}
                        error={Boolean(errors?.bookerLastName)}
                    />
                    <Input
                        type="text"
                        className="border rounded p-3 w-80 mb-4 mr-4"
                        placeholder="Phone number"
                        {...register("bookerPhone")}
                        error={Boolean(errors?.bookerPhone)}
                    />
                    <Input
                        type="text"
                        className="border rounded p-3 w-80 mb-4"
                        placeholder="Email"
                        {...register("bookerEmail")}
                        error={Boolean(errors?.bookerEmail)}
                    />
                    <Input
                        type="text"
                        className="border rounded p-3 w-80 mb-4 mr-4"
                        placeholder="Occasion (optional)"
                        {...register("bookerOccasion")}
                    />
                    <Input
                        type="text"
                        className="border rounded p-3 w-80 mb-4"
                        placeholder="Requests (optional)"
                        {...register("bookerRequest")}
                    />
                    {error && (
                        <Alert severity="error" className="my-4">
                            {error}
                        </Alert>
                    )}
                    <button
                        className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
                        type="submit"
                        disabled={!isValid}
                    >
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            "Complete reservation"
                        )}
                    </button>
                    <p className="mt-4 text-sm">
                        By clicking “Complete reservation” you agree to the
                        OpenTable Terms of Use and Privacy Policy. Standard text
                        message rates may apply. You may opt out of receiving
                        text messages at any time.
                    </p>
                </form>
            )}
        </div>
    );
}
