import useFetchTutor from "@/API/tutors/useFetchTutor";
import Avatar from "@/components/display/Avatar";
import LargeAvatar from "@/components/display/LargeAvatar";
import Header from "@/components/typography/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon } from "@radix-ui/react-icons";
import { TableCell } from "@radix-ui/themes";

export default function TutorView() {
    const tutors = useFetchTutor();
    return (
        <>
            <Header
                text="CSLC Tutors"
                subtext={
                    <>
                        View the tutors and the classes they can tutor.
                    </>
                }
            />
            <Separator className="" />
            <div className="grid grid-cols-8 min-h-screen">
                <div className="col-span-2 border-r">
                    <div className="text-lg font-bold text-primary my-4">
                        Select Tutor
                    </div>
                    <div className="space-y-4">
                        {!tutors?.isLoading &&
                            tutors?.data.map((tutor: any) => (
                                <div>
                                    <Button variant="tutor" className="text-primary space-x-2">
                                        <Avatar name={tutor.name[0]} />
                                        <div className="underline-offset-4 hover:underline">
                                            {tutor.name}
                                        </div>
                                    </Button>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="col-span-6">
                    <Card className="ml-16 mt-8 ">
                        <CardHeader>

                        </CardHeader>
                        <CardContent>
                            <div className="flex">
                                <LargeAvatar name="SN" />
                                <div className="ml-5 mt-4 text-primary space-y-2">
                                    <div className=""><span className="font-bold">Name:</span> STUDENT_NAME</div>
                                    <div className=""><span className="font-bold">Grade Level:</span> STUDENT_GRADE</div>
                                    <div className=""><span className="font-bold">Email:</span> STUDENT_EMAIL</div>
                                </div>
                            </div>
                            <div>
                                <div className="mt-4"><span className="font-bold">About Me:</span> STUDENT_BIO</div>
                            </div>
                        </CardContent>
                        <CardDescription className="flex ml-5 mb-4 space-x-2">
                            <div className="flex items-center content-center">
                                <CalendarIcon width={12} height={12} />
                                <div className="mr-2 ml-1 text-sm text-muted-foreground">Tutor Since:</div>
                                <div className="text-sm text-muted-foreground">August 2023</div>
                            </div>
                        </CardDescription>
                    </Card>
                    <div className="text-foreground ml-16 pt-16">
                        <div className="text-xl font-bold">
                            STUDENT_NAME can tutor:
                        </div>
                        <div className="rounded-md border mt-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[125px]">Course ID</TableHead>
                                        <TableHead className="">Course Name</TableHead>
                                        <TableHead className="text-right">Proficiency Level</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow key="tablerow" className="h-3">
                                        <TableCell className="p-2 font-medium">
                                            CIST-1400
                                        </TableCell>
                                        <TableCell>
                                            Computer Science I
                                        </TableCell>
                                        <TableCell className="text-right pr-2">
                                            High
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="tablerow2" className="h-3">
                                        <TableCell className="p-2 font-medium">
                                            CSCI-1620
                                        </TableCell>
                                        <TableCell>
                                            Computer Science II
                                        </TableCell>
                                        <TableCell className="text-right pr-2">
                                            High
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}