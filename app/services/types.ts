import { Cuisine, PRICE, Location, Review } from "@prisma/client";

export type SearchResultType = {
    id: Number;
    name: string;
    main_image: string;
    price: PRICE;
    location: Location;
    cuisine: Cuisine;
    slug: string;
    reviews: Review[];
};

export type Locations = {
    id: number;
    name: string;
};

export type Cuisines = {
    id: number;
    name: string;
};
