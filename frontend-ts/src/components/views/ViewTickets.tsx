import Header from "../typography/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import ticketData from "../../data/tickets.json"
import { Badge } from "@radix-ui/themes";
import CalendarIcon from "../assets/CalendarIcon";
import { CalendarDaysIcon } from "lucide-react";

export default function ViewTickets() {
    return (
        <>
            <Header text="View Your Tickets" subtext={"View your unclaimed tickets, your open tickets, and your closed tickets."} />
            <div className="hidden lg:flex justify-between gap-4 grid grid-cols-3 w-100">
                <Card className="col-span-1 w-1/3 border-gray-200 rounded-none">
                    <CardTitle className="text-center py-4">
                        Unclaimed Tickets
                    </CardTitle>
                    <CardContent>
                        {ticketData.map((value) => (
                            <div className="mt-2">
                                {
                                    (value.status == "unclaimed") &&
                                    <Card className="w-full border-gray-400 rounded-none shadow-none m-0 p-0">
                                        <div className="flex justify-between pt-2">
                                            <div className="flex leading-5 px-2 text-lg font-semibold flex-wrap">
                                                {value.course}
                                            </div>
                                            <div className="flex justify-end px-2">
                                                <h4 className="text-sm font-semibold"><span className="flex justify-end"><Badge variant="soft" color="yellow">unclaimed</Badge></span></h4>
                                            </div>
                                        </div>
                                        <CardContent className=" pl-2 mt-0 pt-0 pb-2">
                                            <div className="block">
                                                <p className="text-xs font-light text-gray-400">
                                                    @{value["student-name"]}
                                                </p>
                                            </div>
                                        </CardContent>
                                        <div className="px-2 pb-1">
                                            <div className="flex justify-between text-gray-400 font-light tracking-tighter text-xs">
                                                <div className="flex justify-start">
                                                    <CalendarDaysIcon size={16} color="#bbb" strokeWidth={1} />
                                                    {value.date}
                                                </div>
                                                <div className="flex">
                                                    <a className="px-1 underline hover:text-red-600" href='/'>view</a>
                                                    <a className="px-1 underline hover:text-red-600" href='/'>edit</a>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                }
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card className="col-span-1 w-1/3 border-gray-200 rounded-none">
                    <CardTitle className="text-center py-4">
                        Open Tickets
                    </CardTitle>
                    <CardContent>
                        {ticketData.map((value) => (
                            <div className="mt-2">
                                {(value.status == "open") &&
                                    <Card className="w-full border-gray-400 rounded-none shadow-none m-0 p-0">
                                        <div className="flex justify-between pt-2">
                                            <div className="flex leading-5 px-2 text-lg font-semibold flex-wrap">
                                                {value.course}
                                            </div>
                                            <div className="flex justify-end px-2">
                                                <h4 className="text-sm font-semibold"><span className="flex justify-end"><Badge variant="soft" color="green">open</Badge></span></h4>
                                            </div>
                                        </div>
                                        <CardContent className=" pl-2 mt-0 pt-0 pb-2">
                                            <div className="block">
                                                <p className="text-xs font-light text-gray-400">
                                                    @{value["student-name"]}
                                                </p>
                                            </div>
                                        </CardContent>
                                        <div className="px-2 pb-1">
                                            <div className="flex justify-between text-gray-400 font-light tracking-tighter text-xs">
                                                <div className="flex justify-start">
                                                    <CalendarDaysIcon size={16} color="#bbb" strokeWidth={1} />
                                                    {value.date}
                                                </div>
                                                <div className="flex">
                                                    <a className="px-1 underline hover:text-red-600" href='/'>view</a>
                                                    <a className="px-1 underline hover:text-red-600" href='/'>edit</a>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>}
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card className="col-span-1 w-1/3 border-gray-200 rounded-none">
                    <CardTitle className="text-center py-4">
                        Closed Tickets
                    </CardTitle>
                    <CardContent>
                        {ticketData.map((value) => (
                            <div className="mt-2">
                                {(value.status == "closed") &&
                                    <Card className="w-full border-gray-400 rounded-none shadow-none m-0 p-0">
                                        <div className="flex justify-between pt-2">
                                            <div className="flex leading-5 px-2 text-lg font-semibold flex-wrap">
                                                {value.course}
                                            </div>
                                            <div className="flex justify-end px-2">
                                                <h4 className="text-sm font-semibold"><span className="flex justify-end"><Badge variant="soft" color="red">closed</Badge></span></h4>
                                            </div>
                                        </div>
                                        <CardContent className=" pl-2 mt-0 pt-0 pb-2">
                                            <div className="block">
                                                <p className="text-xs font-light text-gray-400">
                                                    @{value["student-name"]}
                                                </p>
                                            </div>
                                        </CardContent>
                                        <div className="px-2 pb-1">
                                            <div className="flex justify-between text-gray-400 font-light tracking-tighter text-xs">
                                                <div className="flex justify-start align-bottom">
                                                    <CalendarDaysIcon size={16} color="#bbb" strokeWidth={1} />
                                                    {value.date}
                                                </div>
                                                <div className="flex">
                                                    <a className="px-1 underline hover:text-red-600" href='/'>view</a>
                                                    <a className="px-1 underline hover:text-red-600" href='/'>edit</a>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}