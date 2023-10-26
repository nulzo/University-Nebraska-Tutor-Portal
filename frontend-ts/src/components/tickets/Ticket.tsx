import { UserMinusIcon, UserPlusIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "../ui/card";
import { format } from "date-fns"
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function Ticket({ name, description, start_time, professor, section, tutor, type }: any) {
    let start_date;
    let start_hour;
    if (start_time) {
        const formatted_start_time = new Date(start_time);
        start_date = format(formatted_start_time, "d MMM yy")
        start_hour = format(formatted_start_time, "HH:mm (aa)")
    }
    return (
        <Card>
            <CardHeader className="relative">
                <div className="absolute right-2 top-2">
                    {type === "new" && <Badge variant={"new_ticket"}>New!</Badge>}
                    {type === "opened" && <Badge variant={"opened_ticket"}>Claimed</Badge>}
                </div>
                <CardTitle>
                    {name}
                </CardTitle>
                <CardTitle>
                    {professor} - {section}
                </CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className=" relative pb-20">

                <div className="absolute left-6 bottom-14 text-xs font-medium text-muted-foreground">
                    Created at: {start_date && `${start_hour}, ${start_date}` || "Time Error... you shouldn't be seeing this! - Nolan"}
                </div>
                {type === "opened" &&
                    <div className="absolute left-6 bottom-9 text-xs font-medium text-muted-foreground">
                        {tutor && `Claimed by: ${tutor}`}
                    </div>
                }
                {/* <div className="flex absolute left-6 bottom-4 text-xs font-medium text-muted-foreground">
                    Closed at: 02:18 (AM), 18 Oct 23 <CheckIcon className="ml-1 stroke-online" /> <XIcon width={16} height={16} strokeWidth={3} className="ml-1 stroke-warning" />
                </div> */}

                <Button variant={"link"} className="absolute right-0 bottom-1 text-xs font-medium text-xs text-foreground font-medium hover:dark:text-online">
                    Claim
                    <UserPlusIcon width={16} height={16} className="ml-1" />
                </Button>
                <Button variant={"link"} className="absolute right-20 bottom-1 text-xs font-medium text-xs text-foreground font-medium hover:dark:text-warning">
                    Close
                    <UserMinusIcon width={16} height={16} className="ml-1" />
                </Button>

            </CardContent>
        </Card>
    )
}