import CalendarIcon from "@/components/assets/CalendarIcon";
import Header from "@/components/typography/Header";
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { format } from "date-fns"
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Announcement } from "@/components/display/Announcement";
import { Input } from "@/components/ui/input";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

function SelectDateRange({ date, setDate, className }: any) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-medium text-foreground",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 stroke-muted-foreground" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Select Date Range</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

function SelectShowDate({ id }: any) {
    return (
        <div className="flex flex-col items-start text-muted-foreground">
            <Switch id={id} />
        </div>
    )
}

function AnnouncementText({ text, setText, remaining, setRemaining }: any) {
    return (
        <div className="relative">
            <p className="absolute top-0 right-0 text-foreground/50 text-xs pr-2 pt-1">{remaining}</p>
            <Textarea placeholder="Enter the announcement here..." className="text-foreground resize-none min-h-[100px]" value={text} onChange={(event) => { setText(event.target.value); setRemaining(255 - text.length) }}></Textarea>
        </div>
    )
}

function scheduleAnnouncement() {
    console.log("scheduled")
}

function AnnouncementTitle({ title, setTitle }: any) {
    return (
        <Input type="text" value={title} onChange={(value) => { setTitle(value.target.value) }} className="text-foreground" placeholder="Enter the title here..." />
    )
}

export default function AdminAnnouncements() {
    const [remaining, setRemaining] = useState(255);
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState<Date>();
    const [variant, setVariant] = useState("default");
    const [showdate, setShowdate] = useState(false);

    function SelectAnnouncementType({ className }: any) {
        return (
            <Select onValueChange={(d) => { setVariant(d) }}>
                <SelectTrigger className="text-foreground font-medium">
                    <SelectValue placeholder="Select an Announcement type" />
                </SelectTrigger>
                <SelectContent className={className}>
                    <SelectGroup className={className}>
                        <SelectLabel>Announcement Types</SelectLabel>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="info">Informative</SelectItem>
                        <SelectItem value="alert">Alert</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="tutor">Tutors Only</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        )
    }

    function Preview() {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary">Preview</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[50vw] text-foreground">
                    <DialogHeader>
                        <DialogTitle>Previewing Announcement</DialogTitle>
                        <DialogDescription>
                            Here is how your announcement will look at the top of the page.
                        </DialogDescription>
                    </DialogHeader>
                    <Announcement title={title} body={text} date={date} displayDate={showdate} variant={variant} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <div>
            <Header text="Announcements" subtext="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
            <Tabs defaultValue="create">
                <TabsList className="w-fit">
                    <TabsTrigger value="create">New</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                    <TabsTrigger value="current">Current</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                </TabsList>
                <TabsContent value="create">
                    <Card className="mt-4">
                        <CardContent>
                            <div className="space-y-8 mt-4">
                                <div className="space-y-2">
                                    <Label className="text-foreground">Enter the body of the Announcement</Label>
                                    <AnnouncementTitle title={title} setTitle={setTitle} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground">Enter the body of the Announcement</Label>
                                    <AnnouncementText text={text} setText={setText} remaining={remaining} setRemaining={setRemaining} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground">Select the type of Announcement</Label>
                                    <SelectAnnouncementType value={variant} setValue={setVariant} className="text-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground">Select date range for the Announcement</Label>
                                    <SelectDateRange date={date} setDate={setDate} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="show-date" className="text-foreground">Display date range in the Announcement</Label>
                                    <SelectShowDate id="show-date" />
                                </div>
                                <div className="space-x-5">
                                    <Button onClick={scheduleAnnouncement}>Schedule</Button>
                                    <Preview />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="current">
                    <Separator className="my-4" />
                </TabsContent>
                <TabsContent value="past">
                    <Separator className="my-4" />
                </TabsContent>
                <TabsContent value="upcoming">
                    <Separator className="my-4" />
                </TabsContent>
            </Tabs>
        </div>
    )
}