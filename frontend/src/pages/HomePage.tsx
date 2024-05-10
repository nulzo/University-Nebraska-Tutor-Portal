import {Announcement} from "@/components/display/announcement.tsx";
import Header from "@/components/typography/Header";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription, CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {useAccount, useIsAuthenticated, useMsal} from "@azure/msal-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";

export interface Link {
    path: string
    text: string,
    description?: string
}

const links: Link[] = [
    {
        path: "#",
        text: "How to access the dark web",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quaerat repellendus aut expedita at rem, provident laborum eius, neque"
    },
    {
        path: "#",
        text: "How to access the dark web",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quaerat repellendus aut expedita at rem, provident laborum eius, neque"
    },
    {
        path: "#",
        text: "How to access the dark web",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quaerat repellendus aut expedita at rem, provident laborum eius, neque"
    },
    {
        path: "#",
        text: "How to access the dark web",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quaerat repellendus aut expedita at rem, provident laborum eius, neque"
    },
    {
        path: "#",
        text: "How to access the dark web",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quaerat repellendus aut expedita at rem, provident laborum eius, neque"
    }
];

export default function HomePage() {
    const isAuthenticated = useIsAuthenticated();
    const {accounts} = useMsal();
    // eslint-disable-next-line
    const account = useAccount(accounts[0] || {});

    return (
        <div className="text-foreground">
            {isAuthenticated && (
                <Header
                    text={`Welcome back, ${account?.name}!`}
                    subtext="Pick up where you last left off."
                />
            )}
            <div className="mt-4 flex text-center pb-4 sm:text-start sm:block justify-center text-foreground dark:text-foreground"></div>
            <div className="flex flex-col sm:block space-y-4">
                <div className="grid gap-4">
                    <Announcement
                        variant="alert"
                        title="You Must Login to Create Tickets!"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="sm:col-span-4 w-[100%] md:w-full">
                        <CardHeader>
                            <CardTitle>Helpful Resources</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-6 grid grid-cols-1 space-y-2">
                            {links && links.map((link: Link) => (
                                <div>
                                    <Button variant="link" className="font-bold justify-start p-0 h-4 m-0">
                                        {link.text}
                                    </Button>
                                    <div className="text-xs text-muted-foreground leading-4">{link.description}</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col justify-start w-100 sm:w-full sm:col-span-3">
                        <CardHeader>
                            <CardTitle>Your Recent Tickets</CardTitle>
                            <CardDescription>Insert Ticket Data Here</CardDescription>
                        </CardHeader>
                        <CardContent className="flex basis-3/4 my-auto">
                            <div
                                className="text-sm flex w-full h-full text-foreground justify-center text-center align-center">
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Ticket #</TableHead>
                                                <TableHead className="hidden sm:table-cell">Status</TableHead>
                                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <div className="font-medium">Liam Johnson</div>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Badge className="text-xs" variant="secondary">
                                                        Fulfilled
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <div className="font-medium">Liam Johnson</div>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Badge className="text-xs" variant="secondary">
                                                        Fulfilled
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <div className="font-medium">Liam Johnson</div>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Badge className="text-xs" variant="secondary">
                                                        Fulfilled
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                            </div>
                        </CardContent>
                        <CardFooter className="align-bottom justify-start items-baseline">
                            <div className="text-xs text-muted-foreground">
                                Showing <strong>3</strong> of <strong>3</strong> tickets
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
