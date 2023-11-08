import { Cuisine, PRICE, Location } from "@prisma/client";

export type SearchResultType = {
    id: Number;
    name: string;
    main_image: string;
    price: PRICE;
    location: Location;
    cuisine: Cuisine;
    slug: string;
};

export type Locations = {
    id: number;
    name: string;
};

export type Cuisines = {
    id: number;
    name: string;
};
