import Header from "@/components/typography/Header";
import {Separator} from "@/components/ui/separator";
import {useQuery} from "@tanstack/react-query";
import {fetchData} from "@/API/api.ts";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Card, CardContent} from "@/components/ui/card.tsx";




export default function HoursPage() {
    const hours = useQuery({
        queryKey: ["hours"],
        queryFn: () => fetchData("hours")
    });
    return (
        <>
            <Header
                text="Hours of Operation"
                subtext="See what hours the tutoring center are open, and see if any
            schedling changes have occured."
            />
            <Separator className="mb-4"/>

                {!hours?.isLoading && (
                    <div className="rounded-md border bg-backgroundsecondary">
                    <Table className="rounded-md">
                        <TableHeader>
                            <TableRow className="rounded">
                                <TableHead className="w-[100px]">Day</TableHead>
                                <TableHead>Opening Time</TableHead>
                                <TableHead>Closing Time</TableHead>
                                {/*<TableHead className="text-right">Amount</TableHead>*/}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {hours?.data?.map((hour: any) => (
                                <TableRow key={hour.id}>
                                    <TableCell className="font-medium">{hour.day_of_week}</TableCell>
                                    <TableCell>{hour.opening_time}</TableCell>
                                    <TableCell>{hour.closing_time}</TableCell>
                                    {/*<TableCell className="text-right">{invoice.totalAmount}</TableCell>*/}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </div>
                )}

        </>
    );
}
