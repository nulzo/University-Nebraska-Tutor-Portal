import React from "react";

export default function SelectInput(props) {
    const options = props.options;
    return (
        <label className="block">
            <select
                className={"block w-full placeholder-gray-400 font-thin invalid:text-gray-400 mt-0 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"}
            >
                <option disabled selected>{props.placeholder}</option>
                {options.map((option, index) => {
                    return <option key={index}>{option}</option>
                })}
            </select>
        </label>
    );
}