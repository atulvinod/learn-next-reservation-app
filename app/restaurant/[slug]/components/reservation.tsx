"use client";
import { getPartySize, times } from "@/data";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function Reservation({
    open_time,
    close_time,
}: {
    open_time: string;
    close_time: string;
}) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handleChangeDate = (date: Date | null) => {
        if (date) {
            return setSelectedDate(date);
        }
        setSelectedDate(null);
    };

    const filterTimesByRestaurantOpenWindow = () => {
        const timesInWindow: typeof times = [];
        let isWithinWindow = false;
        times.forEach((time) => {
            if (time.time == open_time) {
                isWithinWindow = true;
            }

            if (isWithinWindow) {
                timesInWindow.push(time);
            }
            if (time.time == close_time) {
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
                <select name="" className="py-3 border-b font-light" id="">
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
                    <select name="" id="" className="py-3 border-b font-light">
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
                <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
                    Find a Time
                </button>
            </div>
        </div>
    );
}
