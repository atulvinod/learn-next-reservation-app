import React from "react";
import { SearchResultType } from "../page";

export default function SearchResult({
    details,
}: {
    details: SearchResultType;
}) {
    return (
        <div className="border-b flex pb-5">
            <img src={details.main_image} alt="" className="w-44 rounded" />
            <div className="pl-5">
                <h2 className="text-3xl">{details.name}</h2>
                <div className="flex items-start">
                    <div className="flex mb-2">*****</div>
                    <p className="ml-2 text-sm">Awesome</p>
                </div>
                <div className="mb-9">
                    <div className="font-light flex text-reg">
                        <p className="mr-4">$$$</p>
                        <p className="mr-4">{details.cuisine.name}</p>
                        <p className="mr-4">{details.location.name}</p>
                    </div>
                </div>
                <div className="text-red-600">
                    <a href="">View more information</a>
                </div>
            </div>
        </div>
    );
}
