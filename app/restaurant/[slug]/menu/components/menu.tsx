import React from "react";
import MenuCard from "./menu_card";
import { RestaurantMenuType } from "../page";

export default function Menu({ items }: { items: RestaurantMenuType }) {
    return (
        <main className="bg-white mt-5">
            <div>
                <div className="mt-4 pb-1 mb-1">
                    <h1 className="font-bold text-4xl">Menu</h1>
                </div>
                <div className="flex flex-wrap justify-between">
                    {items.items.length ? (
                        items.items.map((item) => {
                            return <MenuCard key={item.id} item={item} />;
                        })
                    ) : (
                        <p>This restaurant has no Menu</p>
                    )}
                </div>
            </div>
        </main>
    );
}
