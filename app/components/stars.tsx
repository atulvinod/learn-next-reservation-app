import Image from "next/image";
import React from "react";
import fullStar from "../../icons/full-star.png";
import halfStar from "../../icons/half-star.png";
import emptyStar from "../../icons/empty-star.png";
import { Review } from "@prisma/client";

export default function Stars({ reviews }: { reviews: Review[] }) {
    function getStars(reviews: Review[]) {
        const totalRating = reviews.reduce((agg, v) => agg + v.rating, 0);
        const averageRating = totalRating / (reviews.length || 1);
        let fullStarCount = Math.floor(averageRating);
        let halfStarCount = 0;
        const fractionalPart = (averageRating - Math.floor(averageRating)) * 10;
        if (fractionalPart > 5) {
            halfStarCount = 1;
        }
        let emptyStarCount = 5 - (fullStarCount + halfStarCount);
        const elements = [];
        while (fullStarCount--) {
            elements.push(fullStar);
        }
        while (halfStarCount--) {
            elements.push(halfStar);
        }
        while (emptyStarCount--) {
            elements.push(emptyStar);
        }
        return elements.map((star, i) => (
            <Image src={star} alt="stars" key={i} className="w-4 h-4 mr-1" />
        ));
    }
    return (
        <div className="flex items-center">
            {reviews.length ? (
                getStars(reviews)
            ) : (
                <span className="text-sm italic text-grey">
                    -- No reviews --
                </span>
            )}
        </div>
    );
}
