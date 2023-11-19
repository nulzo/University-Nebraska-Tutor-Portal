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
import {
  FileCheck2Icon,
  FileIcon,
  FileX2Icon,
  LayersIcon,
  RatIcon,
} from "lucide-react";
import useFetchTicket from "@/API/tickets/useFetchTicket";
import TicketTable from "@/components/tables/TicketTable";

export default function TutorDashboard() {
  const unclaimedTickets = useFetchTicket("new", "?status=NEW");
  const openTickets = useFetchTicket("opened", "?status=OPENED");
  const closedTickets = useFetchTicket("closed", "?status=CLOSED");
  const allTickets = useFetchTicket("all", "");
  return (
    <>
      <Header text="Tutor Dashboard" subtext=""></Header>
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
              <div>
                <Card className="w-[100%] md:w-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Tickets
                    </CardTitle>
                    <LayersIcon
                      className="stroke-foreground"
                      size={16}
                      strokeWidth={2}
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {!allTickets?.isLoading && allTickets?.data.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {/* +20.1% from last month */}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="w-[100%] md:w-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Unclaimed Tickets
                    </CardTitle>
                    <FileCheck2Icon
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {!unclaimedTickets?.isLoading &&
                        unclaimedTickets?.data.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {/* +19% from last month */}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="w-[100%] md:w-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Open Tickets
                    </CardTitle>
                    <FileIcon width={16} height={16} viewBox="0 0 24 24" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {!openTickets?.isLoading && openTickets?.data.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {/* +1 since last hour */}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div>
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
                    <div className="text-2xl font-bold">
                      {!closedTickets?.isLoading && closedTickets?.data.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {/* data here */}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="pt-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="sm:col-span-4 md:col-span-7 w-[100%] md:w-full">
                  <CardHeader>
                    <CardTitle>Recent Tickets</CardTitle>
                    <CardDescription>
                      Overview of 24 hour ticket data
                    </CardDescription>
                  </CardHeader>
                  {!allTickets?.isLoading && allTickets?.data.length < 1 && (
                    <CardContent className="pl-2 min-h-[30vh] flex justify-center text-center content-center place-content-center items-center align-center font-medium text-muted-foreground">
                      <div>
                        <div className="flex justify-center place-self-center">
                          <RatIcon />
                        </div>
                        <div>Wow, so empty!</div>
                      </div>
                    </CardContent>
                  )}
                  {!allTickets?.isLoading && allTickets?.data.length > 0 && (
                    <TicketTable tickets={allTickets?.data} />
                  )}
                </Card>
              </div>
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
            <CardContent className="space-y-4 p-0">
              {!unclaimedTickets?.isLoading &&
                unclaimedTickets?.data &&
                unclaimedTickets.data.map((ticket: any) => (
                  <Ticket ticket={ticket} />
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
            <CardContent className="space-y-4 p-0">
              {!openTickets?.isLoading &&
                openTickets?.data &&
                openTickets?.data.map((ticket: any) => (
                  <Ticket ticket={ticket} />
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
            <CardContent className="space-y-4 p-0">
              {!closedTickets?.isLoading &&
                closedTickets?.data &&
                closedTickets.data.map((ticket: any) => (
                  <Ticket ticket={ticket} />
                ))}
            </CardContent>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
