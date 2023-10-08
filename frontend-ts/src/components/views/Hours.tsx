import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Component } from "react";
import Header from "../typography/Header";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default class Hours extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            isLoading: true
        };
    }

    componentDidMount(): void {
        axios.get("http://localhost:8000/api/hours/").then((res) => { this.setState({ data: res.data, isLoading: false }) });
    }

    render() {
        if (!this.state.isLoading) {
            let hours_of_operation = this.state.data[0];
            console.log(hours_of_operation);
            return (
                <>
                    <Header />
                    <div className="flex sm:block md:flex w-100">
                        <div className="flex-1 space-y-2 w-full">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        CSLC Hours of Operation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table className="">
                                        <TableHeader className="bg-gray-100">
                                            <TableRow>
                                                <TableHead className="pl-5 w-3/4">Day</TableHead>
                                                <TableHead className="w-1/8 text-center">Open</TableHead>
                                                <TableHead className="pr-5 text-right">Close</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow key={hours_of_operation.mondayClose}>
                                                <TableCell className="pl-5 font-medium">Monday</TableCell>
                                                <TableCell className="font-medium text-center">{hours_of_operation.mondayOpen}</TableCell>
                                                <TableCell className="pr-5 font-medium text-right">{hours_of_operation.mondayClose}</TableCell>
                                            </TableRow>
                                            <TableRow key={hours_of_operation.tuesdayClose}>
                                                <TableCell className="pl-5 font-medium">Tuesday</TableCell>
                                                <TableCell className="font-medium text-center">{hours_of_operation.tuesdayOpen}</TableCell>
                                                <TableCell className="pr-5 font-medium text-right">{hours_of_operation.tuesdayClose}</TableCell>
                                            </TableRow>
                                            <TableRow key={hours_of_operation.wednesdayClose}>
                                                <TableCell className="pl-5 font-medium">Wednesday</TableCell>
                                                <TableCell className="font-medium text-center">{hours_of_operation.wednesdayOpen}</TableCell>
                                                <TableCell className="pr-5 font-medium text-right">{hours_of_operation.wednesdayClose}</TableCell>
                                            </TableRow>
                                            <TableRow key={hours_of_operation.mondayClose}>
                                                <TableCell className="pl-5 font-medium">Thursday</TableCell>
                                                <TableCell className="font-medium text-center">{hours_of_operation.thursdayOpen}</TableCell>
                                                <TableCell className="pr-5 font-medium text-right">{hours_of_operation.thursdayClose}</TableCell>
                                            </TableRow>
                                            <TableRow key={hours_of_operation.mondayClose}>
                                                <TableCell className="pl-5 font-medium">Friday</TableCell>
                                                <TableCell className="font-medium text-center">{hours_of_operation.fridayOpen}</TableCell>
                                                <TableCell className="pr-5 font-medium text-right">{hours_of_operation.fridayClose}</TableCell>
                                            </TableRow>
                                            <TableRow key={hours_of_operation.mondayClose}>
                                                <TableCell className="pl-5 font-medium">Saturday</TableCell>
                                                <TableCell className="font-medium text-center">{hours_of_operation.saturdayOpen}</TableCell>
                                                <TableCell className="pr-5 font-medium text-right">{hours_of_operation.saturdayClose}</TableCell>
                                            </TableRow>
                                            <TableRow key={hours_of_operation.sundayOpen}>
                                                <TableCell className="pl-5 font-medium">Sunday</TableCell>
                                                <TableCell className="font-medium text-center">{hours_of_operation.sundayOpen}</TableCell>
                                                <TableCell className="pr-5 font-medium text-right">{hours_of_operation.sundayClose}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                            <div className="text-gray-400 text-center">Holidays <em>may</em> impact times shown.</div>
                        </div>
                    </div>
                </>
            )
        }
    }
}