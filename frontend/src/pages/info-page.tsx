import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Header from "@/components/typography/Header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {ExternalLink, ZoomInIcon} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {fetchData} from "@/API/api.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Announcement} from "@/components/display/announcement.tsx";

export default function InfoPage() {
  function onClick() {
    window.open("https://unomaha.zoom.us/s/94531042940");
  }
  const hours = useQuery({
    queryKey: ["hours"],
    queryFn: () => fetchData("hours")
  });

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <Card className="text-foreground">
          <CardHeader>
            <CardTitle>
              Zoom Information
            </CardTitle>
            <CardDescription>
              Zoom zoom zoomin on zoom
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <h3 className="text-xl py-2 text-center font-bold tracking-tight">
                Open Zoom Client
              </h3>
            </div>
            <div className="flex flex-wrap justify-center py-2">
              <button
                  onClick={onClick}
                  className="flex bg-zoom hover:bg-[#297EE5] text-white font-bold py-2 px-4 rounded"
              >
                <div className="px-2">
                  <ZoomInIcon />
                </div>
                Launch Zoom
              </button>
              <br />
            </div>
            <div className="flex flex-wrap justify-center">
              <Button variant={"link"} className="text-zoom">
                www.google.com
              </Button>
            </div>
            <div className="flex text-center justify-center ">or</div>
            <div>
              <h3 className="text-xl pb-2 text-center font-bold tracking-tight">
                Enter Meeting Code:
              </h3>
              <h2 className="text-lg font-semibold tracking-wide text-center text-blue-600">
                945 3104 2940
              </h2>
            </div>
          </CardContent>
        </Card>
        <Card className="text-foreground">
          <CardHeader>
            <CardTitle>
              CSLC Hours of Operation
            </CardTitle>
            <CardDescription>
              Come on in and come on in and come on in!
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(hours.isFetching || hours.isLoading) && (
                <>
                  <Skeleton className="w-full h-12"></Skeleton>
                  <Skeleton className="w-full mt-2 h-6"></Skeleton>
                  <Skeleton className="w-full mt-2 h-6"></Skeleton>
                  <Skeleton className="w-full mt-2 h-6"></Skeleton>
                  <Skeleton className="w-full mt-2 h-6"></Skeleton>
                  <Skeleton className="w-full mt-2 h-6"></Skeleton>
                  <Skeleton className="w-full mt-2 h-6"></Skeleton>
                </>
            )}
            {hours.isError && (
                <Announcement
                    variant="warning"
                    title="Failed to successfully load in CSLC hours!"
                    body="erm... hermph... this is not epic... something happened on our end, and we couldn't verify the content. Whoops! Check back later, or contact the site admin."
                />
              )}
            {!hours?.isLoading && !hours?.isError && (
                <div className="rounded-md bg-backgroundsecondary">
                  <Table className="rounded-md">
                    <TableHeader>
                      <TableRow className="rounded">
                        <TableHead className="w-[100px]">Day</TableHead>
                        <TableHead>Opening Time</TableHead>
                        <TableHead>Closing Time</TableHead>
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
          </CardContent>
        </Card>
        <Card className="text-foreground col-span-2">
          <CardHeader>
            <CardTitle>
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Come on in and come on in and come on in!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It's animated by default, but you can disable it if you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        <div className="col-span-2 grid grid-cols-4 gap-4">
          <Card className="text-foreground">
            <CardHeader>
              <CardTitle>
                Want to be a Tutor?
              </CardTitle>
              <CardDescription>
                We are always looking for bright and motivated students
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              Think you have what it takes to be a tutor? You can click the button below to apply externally. Good luck!
              <div className="flex justify-center mt-4">
                <Button variant="secondary" className="gap-1">
                  Apply Externally <ExternalLink size={12}/>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="text-foreground">
            <CardHeader>
              <CardTitle>
                Report an Issue
              </CardTitle>
              <CardDescription>
                We aren't immune to web issues.
                Please report a bug if you spot one!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm flex flex-col">
              If you've noticed any oddities with the tutoring portal, please let us know below.
              <div className="flex justify-center mt-4">
                <Button variant="secondary" className="gap-1">
                  Report Bug <ExternalLink size={12}/>
                </Button>
              </div>
              <div className="mt-2 flex text-xs justify-center">
                or email
              </div>
              <div className="flex text-xs justify-center">
                  <Button variant="link" className="m-0 p-0 h-4 text-xs">nolangregory@unomaha.edu</Button>
              </div>

            </CardContent>
          </Card>
          <Card className="text-foreground">
          <CardHeader>
              <CardTitle>
                Request Accommodations
              </CardTitle>
              <CardDescription>
                etc
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          <Card className="text-foreground">
            <CardHeader>
              <CardTitle>
                University Information
              </CardTitle>
              <CardDescription>
                etc
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
