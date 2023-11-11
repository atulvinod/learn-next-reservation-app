"use client";
import { getPartySize, times } from "@/data";
import useAvailAbilities from "@/hooks/useAvailability";
import { isoStringToLocalTime } from "@/utils/common";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";

export default function Reservation({
    open_time,
    close_time,
    slug,
}: {
    open_time: string;
    close_time: string;
    slug: string;
}) {
    const { data, loading, error, fetchAvailabilities } = useAvailAbilities();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [time, setTime] = useState(open_time);
    const [partySize, setPartySize] = useState("2");
    const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

    const handleChangeDate = (date: Date | null) => {
        if (date) {
            const day = date.toISOString().split("T")[0];
            setDay(day);
            return setSelectedDate(date);
        }
        setSelectedDate(null);
    };

    const handleClick = () => {
        fetchAvailabilities({
            slug,
            time,
            partySize,
            day,
        });
    };

    const filterTimesByRestaurantOpenWindow = () => {
        const timesInWindow: typeof times = [];
        let isWithinWindow = false;
        times.forEach((t) => {
            if (t.time == open_time) {
                isWithinWindow = true;
            }

            if (isWithinWindow) {
                timesInWindow.push(t);
            }
            if (t.time == close_time) {
                isWithinWindow = false;
            }
        });
        return timesInWindow;
    };

    return (
        <div className="fixed w-[15%] bg-white rounded p-3 shadow">
            <div className="text-center border-b pb-2 font-bold">
                <h4 className="mr-7 text-lg">Make a Reservation</h4>
            </div>
            <div className="my-3 flex flex-col">
                <label htmlFor="">Party size</label>
                <select
                    name=""
                    className="py-3 border-b font-light"
                    id=""
                    value={partySize}
                    onChange={(e) => setPartySize(e.target.value)}
                >
                    {getPartySize().map((element, index) => (
                        <option key={index} value={element.value}>
                            {element.option}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleChangeDate}
                        className="py-3 border-b font-light text-reg w-24"
                        dateFormat={"MMMM d"}
                        wrapperClassName="w-[48%]"
                    />
                </div>
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Time</label>
                    <select
                        name=""
                        id=""
                        className="py-3 border-b font-light"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    >
                        {filterTimesByRestaurantOpenWindow().map(
                            (time, index) => (
                                <option key={index} value={time.time}>
                                    {time.displayTime}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>
            <div className="mt-5">
                <button
                    disabled={loading}
                    className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
                    onClick={handleClick}
                >
                    {loading ? (
                        <CircularProgress color="inherit" />
                    ) : (
                        "Find a Time"
                    )}
                </button>
            </div>
            {data && data.length ? (
                <div className="mt-4">
                    <p className="text-reg">Select a Time</p>
                    <div className="flex flex-wrap mt-2">
                        {data.map((time, index) =>
                            time.available ? (
                                <Link
                                    key={index}
                                    href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                                >
                                    <div
                                        key={index}
                                        className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                                    >
                                        <p className="text-sm text-bold">
                                            {isoStringToLocalTime(time.time)}
                                        </p>
                                    </div>
                                </Link>
                            ) : (
                                <div key={index}>
                                    <p className="bg-gray-300 text-center p-2 w-24 rounded mr-3 mb-3">
                                        {isoStringToLocalTime(time.time)}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
