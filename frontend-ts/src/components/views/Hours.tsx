import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@radix-ui/themes"
import { useEffect, useState } from "react";
import Header from "../typography/Header";

const hours = [
    {
        day: "Monday",
        open: "09:00",
        close: "20:00",
        color: ""
    },
    {
        day: "Tuesday",
        open: "09:00",
        close: "20:00",
        color: ""
    },
    {
        day: "Wednesday",
        open: "09:00",
        close: "20:00",
        color: ""
    },
    {
        day: "Thursday",
        open: "09:00",
        close: "20:00",
        color: ""
    },
    {
        day: "Friday",
        open: "09:00",
        close: "20:00",
        color: ""
    },
    {
        day: "Saturday",
        open: "10:30",
        close: "14:30",
        color: ""
    },
    {
        day: "Sunday",
        open: "Closed",
        close: "Closed",
        color: "red"
    },
]

export default function Hours() {
    const [date, setDate] = useState(new Date());

    let d = new Date(new Date().toLocaleString("en-US", { timeZone: "CST" }));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date(new Date().toLocaleString("en-US", { timeZone: "CST" })));
        }, 1000)
        return () => clearInterval(intervalId);
    }, [])

    return (
        <>
            <Header
                text="Hours of Operation"
                subtext={
                    <>
                        <p>The current time at the <span className="font-semibold text-gray-700">CSLC</span> is <span className="font-bold text-gray-900">{String(date.getHours()).padStart(2, "0")}:{String(date.getMinutes()).padStart(2, "0")}:{String(date.getSeconds()).padStart(2, "0")}</span></p>
                        <p> We are currently: {(d.getHours() >= 9 && d.getHours() <= 20) && <Badge color="green">Open</Badge> || <Badge size="1" color="red">Closed</Badge>} </p>
                    </>
                } />
            <div className="flex sm:block md:flex w-100">
                <div className="flex-1 space-y-2 w-full">
                    <Table className="shadow-lg border">
                        <TableCaption className="text-gray-400">Holidays <em>may</em> impact times shown.</TableCaption>
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead className="pl-5 w-3/4">Day</TableHead>
                                <TableHead className="w-1/8">Open</TableHead>
                                <TableHead className="w-1/8">Close</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {hours.map((day) => (
                                <TableRow key={day.day}>
                                    <TableCell className="pl-5 font-medium">{day.day}</TableCell>
                                    <TableCell>{day.color == "red" ? <span className="font-semibold text-red-700"> {day.open}</span> : <span> {day.open}</span>}</TableCell>
                                    <TableCell>{day.color == "red" ? <span className="font-semibold text-red-700"> {day.close}</span> : <span> {day.close}</span>}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}