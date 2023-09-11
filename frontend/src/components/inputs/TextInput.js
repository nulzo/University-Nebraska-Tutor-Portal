import React from "react";

export default function TextInput({type, placeholder, register}) {
    return (
        <input

            type={type}
            className={"mt-0 placeholder-gray-400 font-thin block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-500"}
            placeholder={placeholder}
        />

    )
}