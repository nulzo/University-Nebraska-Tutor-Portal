import "../styles/home.css"
import "../styles/output.css"
import useChangeTitle from "../components/useChangeTitle";
import React, {useRef, useState} from "react";
import Navbar from "../components/nav/Navbar";
import TicketForm from "../components/inputs/TicketForm";



export default function Home() {

    useChangeTitle("CSLC Tutoring Portal")
    return (
        <main className={"font-body font-OpenSans"}>
            <Navbar/>
            <TicketForm/>
        </main>
    )
        ;
}