import { Review, User } from "@prisma/client";
import React from "react";
import ReviewCard from "./review_card";

export default function Reviews({
    reviews,
}: {
    reviews: (Review & { user: User })[];
}) {
    return (
        <>
            {reviews.length ? (
                <div>
                    <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
                        What {reviews.length} people are saying
                    </h1>
                    <div>
                        {reviews.map((review) => {
                            return (
                                <ReviewCard key={review.id} review={review} />
                            );
                        })}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
