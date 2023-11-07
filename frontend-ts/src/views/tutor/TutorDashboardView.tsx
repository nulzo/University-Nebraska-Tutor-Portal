import Ticket from "@/components/tickets/Ticket";
import Header from "@/components/typography/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCheck2Icon, FileIcon, FileX2Icon, LayersIcon } from "lucide-react";
import useFetchTicket from "@/API/tickets/useFetchTicket";

export default function TutorDashboard() {
  const unclaimedTickets = useFetchTicket("unclaimed", "?started=false");
  const openTickets = useFetchTicket("open", "?started=true");
  const closedTickets = useFetchTicket("closed", "?completed=true");
  return (
    <>
      <Header text="Tutor Dashboard" subtext="lorem impsum"></Header>
      <div className="flex flex-col sm:block">
        <Tabs defaultValue="today" className="space-y-4">
          <TabsList>
            <TabsTrigger value="today">Pulse</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="">
            <Label className="text-base text-foreground">The CSLC Pulse</Label>
            <CardDescription>
              Data is collected from the past 24hrs and displayed on this page.
            </CardDescription>
            <Separator className="mb-4 mt-2" />
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <Card className="w-[100%] md:w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Tickets
                  </CardTitle>
                  <LayersIcon
                    className="stroke-foreground"
                    height={16}
                    width={16}
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">265</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="w-[100%] md:w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Closed Tickets
                  </CardTitle>
                  <FileX2Icon
                    width={16}
                    height={16}
                    className="stroke-foreground"
                    viewBox="0 0 24 24"
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">235</div>
                  <p className="text-xs text-muted-foreground">
                    -4% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="w-[100%] md:w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Success Tickets
                  </CardTitle>
                  <FileCheck2Icon width={16} height={16} viewBox="0 0 24 24" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">230</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="w-[100%] md:w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Open Now
                  </CardTitle>
                  <FileIcon width={16} height={16} viewBox="0 0 24 24" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    +1 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="sm:col-span-4 w-[100%] md:w-full">
                <CardHeader>
                  <CardTitle>Total Ticket Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2"></CardContent>
              </Card>
              <Card className="w-100 sm:w-full sm:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Tickets</CardTitle>
                  <CardDescription>Insert Ticket Data Here</CardDescription>
                </CardHeader>
                <CardContent>placeholder text</CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="new" className="">
            <Label className="text-base text-foreground">
              New and Unclaimed Tickets
            </Label>
            <CardDescription>
              Below are the currently unclaimed tickets. Please claim tickets
              that you are working on.
            </CardDescription>
            <Separator className="mb-4 mt-2" />
            {console.log(unclaimedTickets?.data)}
            <CardContent className="space-y-4">
              {!unclaimedTickets?.isLoading &&
                unclaimedTickets?.data &&
                unclaimedTickets.data.map((ticket: any) => (
                  <Ticket
                    name={ticket.name}
                    professor={ticket.professor}
                    description={ticket.description}
                    section={ticket.course}
                    started={ticket.started}
                    completed={ticket.completed}
                    start_time={ticket.start_time}
                    type={"new"}
                  />
                ))}
            </CardContent>
          </TabsContent>
          <TabsContent value="open" className="">
            <Label className="text-base text-foreground">Opened Tickets</Label>
            <CardDescription>
              Tickets that have been opened, but are not yet closed. Please
              ensure you close all opened tickets.
            </CardDescription>
            <Separator className="mb-4 mt-2" />
            <CardContent className="space-y-4">
              {!openTickets?.isLoading &&
                openTickets?.data &&
                openTickets?.data.map((ticket: any) => (
                  <Ticket
                    name={ticket.name}
                    professor={ticket.professor}
                    tutor={ticket.tutor}
                    description={ticket.description}
                    section={ticket.course}
                    started={ticket.started}
                    completed={ticket.completed}
                    start_time={ticket.start_time}
                    type={"opened"}
                  />
                ))}
            </CardContent>
          </TabsContent>
          <TabsContent value="closed" className="">
            <Label className="text-base text-foreground">Closed Tickets</Label>
            <CardDescription>
              Tickets that have been opened, but are not yet closed. Please
              ensure you close all opened tickets.
            </CardDescription>
            <Separator className="mb-4 mt-2" />
            <CardContent className="space-y-4">
              {!openTickets?.isLoading &&
                openTickets?.data &&
                openTickets.data.map((openTickets: any) => (
                  <Ticket
                    name={openTickets.student}
                    tutor={openTickets.tutor}
                    professor={openTickets.professor}
                    description={openTickets.description}
                    section={openTickets.section}
                    started={openTickets.started}
                    completed={openTickets.completed}
                    start_time={openTickets.start_time}
                    type={"opened"}
                  />
                ))}
            </CardContent>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
