import { isoStringToLocalTime } from "@/utils/common";
import React from "react";
import { format } from "date-fns";

export default function ReservationHeader({
    name,
    main_image,
    date,
    partySize,
}: {
    date: string;
    partySize: string;
    name: string;
    main_image: string;
}) {
    const [, time] = date.split("T");
    return (
        <div>
            <h3 className="font-bold">You&apos;re almost done!</h3>
            <div className="mt-5 flex">
                <img src={main_image} alt="" className="w-32 h-18 rounded" />
                <div className="ml-4">
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <div className="flex mt-3">
                        <p className="mr-6">
                            {format(new Date(date), "cccc, LLL, d")}
                        </p>
                        <p className="mr-6">{isoStringToLocalTime(time)}</p>
                        <p className="mr-6">
                            {partySize} {partySize == "1" ? "person" : "people"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
