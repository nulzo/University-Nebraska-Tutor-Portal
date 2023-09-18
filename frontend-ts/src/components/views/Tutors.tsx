import {
    Card,
    CardContent,
} from "@/components/ui/card"
import '@radix-ui/themes/styles.css';

import CalendarIcon from "../assets/CalendarIcon"
import { Avatar, Badge } from '@radix-ui/themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import data from "../../data/tutors.json"
import Header from "../typography/Header";

export default function Tutors() {
    let tutorCount = 4;
    return (
        <>
            <Tabs defaultValue="tutors">
                <Header text="CSLC Tutors"
                    subtext={
                        <>
                            <p className="pb-4">
                                There are currently: {(tutorCount !== 0) ? <Badge color="green">{tutorCount} active tutors</Badge> : <Badge color="red">{tutorCount} active tutors</Badge>}
                            </p>
                            <TabsList>
                                <TabsTrigger value="tutors">All Tutors</TabsTrigger>
                                <TabsTrigger value="analytics" disabled>
                                    In-Person Tutors
                                </TabsTrigger>
                                <TabsTrigger value="reports" disabled>
                                    Online Tutors
                                </TabsTrigger>
                            </TabsList>

                        </>
                    } />
                <TabsContent value="tutors" className="py-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.map((item) => (
                            <Card className="w-full lg:w-[90%] md:w-[95%] mt-3 col-span-1 transition ease-in 1 hover:scale-[1.02] hover:shadow-lg">
                                <CardContent>
                                    <div className="flex pt-6 justify-start space-x-4">
                                        <div className="relative inline-block">
                                            <Avatar className="relative inline-flex" color="cyan" size="4" radius="large" fallback="NG"></Avatar>
                                            <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-green-300 border-2 border-white rounded-full -top-1 -right-1 dark:border-gray-900"></div>
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-semibold">{item.name}<span className="pl-2"><Badge variant="soft" color="green">{item.status}</Badge></span></h4>
                                            <p className="text-sm font-light text-gray-400">
                                                {item.handle}
                                            </p>
                                            <p className="text-sm font-base my-2">
                                                {item.text}
                                            </p>
                                            <div className="flex items-center pt-2">
                                                <div className="opacity-75 pr-1">
                                                    <CalendarIcon />
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    Joined {item.start}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </>
    )
}
