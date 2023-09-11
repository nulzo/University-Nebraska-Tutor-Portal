import React, {useRef, useState} from "react";
import Quill from "./Quill";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import BlockGroup from "../forms/BlockGroup";
import Box from "../display/Box";
import {useForm} from 'react-hook-form'

export default function TicketForm(props) {
    const {register, handleSubmit, formState: {errors}, watch} = useForm();
    let GroupCompleted = true;
    return (
        <Box>
            <form method={props.method} onSubmit={handleSubmit((data) => console.log(data))}>
                <div
                    className="pt-3 pb-10 mx-40 flex text-center font-thin justify-center text-5xl text-gray-600">
                    Submit Ticket
                </div>
                <div className="mt-4">
                    <div className="grid grid-cols-1 gap-6">
                        <BlockGroup completed={GroupCompleted}>
                            <div className={"grid grid-cols-3 gap-6"}>
                                <input
                                    {...register("FirstName", {required: "Please enter your first name"})}
                                    className={"mt-0 placeholder-gray-400 font-thin block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-500"}
                                    placeholder="First Name"
                                />
                                <TextInput type={"text"} placeholder={"Last Name"} register={register} />
                                <SelectInput placeholder={"Grade Level"}
                                             options={["Freshman", "Sophomore", "Junior", "Senior"]}/>

                            </div>
                            <div className={"grid grid-cols-2 gap-6"}>
                                <TextInput type={"email"} placeholder={"email@unomaha.edu"}/>
                                <TextInput type={"password"} placeholder={"NUID"}/>
                            </div>
                        </BlockGroup>

                        <BlockGroup>
                            {/*<label className="block">*/}
                            {/*    <input*/}
                            {/*        type="date"*/}
                            {/*        placeholder={"date"}*/}
                            {/*        className={"mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"}*/}
                            {/*    />*/}
                            {/*</label>*/}
                            <div className={"grid grid-cols-3 gap-10"}>
                                <label className="block">
                                    <select
                                        className={"block w-full invalid:text-gray-400 mt-0 font-thin px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"}
                                    >
                                        <option disabled selected>Course</option>
                                        <option>In-Person</option>
                                        <option>Online</option>
                                        <option>Hybrid</option>
                                    </select>
                                </label>
                                <label className="block">
                                    <select
                                        className={"block w-full mt-0 px-0.5 border-0 border-b-2 font-thin border-gray-200 focus:ring-0 focus:border-black"}
                                    >
                                        <option disabled selected>Professor</option>
                                        <option>In-Person</option>
                                        <option>Online</option>
                                        <option>Hybrid</option>
                                    </select>
                                </label>
                                <label className="block">
                                    <select
                                        className={"block w-full mt-0 px-0.5 border-0 border-b-2 font-thin border-gray-200 focus:ring-0 focus:border-black"}
                                    >
                                        <option disabled selected>Course Modality</option>
                                        <option>In-Person</option>
                                        <option>Online</option>
                                        <option>Hybrid</option>
                                    </select>
                                </label>
                            </div>
                        </BlockGroup>
                        <Quill/>
                        <div className={"pt-5 flex justify-between"}>
                            <div className={"col-span-1"}>
                                <button
                                    className={"px-4 py-2 rounded-md text-sm font-medium border focus:outline-none focus:ring transition text-gray-600 border-gray-600 hover:text-white hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-300"}
                                    type="submit">Cancel
                                </button>
                            </div>
                            <div className={"col-span-8"}>

                            </div>
                            <div className={"col-span-1"}>
                                <button
                                    className={"px-4 py-2 rounded-md text-sm font-medium border focus:outline-none focus:ring transition text-green-600 border-green-600 hover:text-white hover:bg-green-600 active:bg-green-700 focus:ring-green-300"}
                                    type="submit">Submit Ticket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Box>
    );
}