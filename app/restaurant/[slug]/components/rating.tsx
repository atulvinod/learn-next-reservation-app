import Stars from "@/app/components/stars";
import { Review } from "@prisma/client";
import React from "react";

export default function Rating({ reviews }: { reviews: Review[] }) {
    const getAvgRating = function (reviews: Review[]) {
        if (!reviews.length) {
            return null;
        }
        const total = reviews.reduce((agg, v) => agg + v.rating, 0);
        return (total / (reviews.length || 1)).toFixed(1);
    };
    const avgRating = getAvgRating(reviews);
    return (
        <div className="flex items-end">
            <div className="ratings mt-2 flex items-center">
                <p>
                    <Stars reviews={reviews} />
                </p>
                {avgRating ? (
                    <p className="text-reg ml-3">{avgRating}</p>
                ) : (
                    <></>
                )}
            </div>
            <div>
                <p className="text-reg ml-4">{reviews.length} Reviews</p>
            </div>
        </div>
    );
}
