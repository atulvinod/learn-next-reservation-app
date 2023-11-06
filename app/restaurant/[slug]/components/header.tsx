import React from "react";

const renderTitle = (title: string) => {
    const parts = title.split("-");
    parts[parts.length - 1] = `(${parts[parts.length - 1]})`;
    return parts.join(" ");
};

export default function Header({ name }: { name: string }) {
    return (
        <div className="h-96 overflow-hidden">
            <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
                <h1 className="text-7xl text-white capitalize text-shadow text-center">
                    {renderTitle(name)}
                </h1>
            </div>
        </div>
    );
}
