import fetchOrCreateUser from "@/API/authenticateRequests";
import Header from "@/components/typography/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useIsAuthenticated } from "@azure/msal-react";

export default function HomeView() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="text-foreground">
      {isAuthenticated && (
        <Header
          text={"Welcome back, NAME!"}
          subtext="Pick up where you last left off"
        />
      )}
      {!isAuthenticated && (
        <Header
          text="Home Page"
          subtext="Please log in to submit ticket requests"
        />
      )}
      <div className="flex flex-col sm:block space-y-4">
        <div className="grid gap-4">
          <Card className="w-[100%]">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  <p>Recent Announcements</p>
                  <p className="animate-pulse">
                    <Badge variant={"new_ticket"}>New</Badge>
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
              omnis, optio architecto, aut eveniet aperiam iste necessitatibus
              dignissimos nihil, placeat illo obcaecati. Nulla voluptate illum
              soluta fuga quod temporibus a!
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="sm:col-span-4 w-[100%] md:w-full">
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent className="pl-6 grid grid-cols-1 space-y-2">
              <div>
                <Button variant={"link"} className={"font-bold"}>
                  How to Access the Dark Web?
                </Button>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis quaerat repellendus aut expedita at rem,
                  provident laborum eius, neque
                </p>
              </div>
              <div>
                <Button variant={"link"} className={"font-bold"}>
                  How to Access the Dark Web?
                </Button>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <div>
                <Button variant={"link"} className={"font-bold"}>
                  How to Access the Dark Web?
                </Button>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis quaerat repellendus aut expedita at rem,
                  provident laborum eius, neque
                </p>
              </div>
              <div>
                <Button variant={"link"} className={"font-bold"}>
                  How to Access the Dark Web?
                </Button>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis quaerat repellendus aut expedita at rem,
                  provident laborum eius, neque
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-100 sm:w-full sm:col-span-3">
            <CardHeader>
              <CardTitle>Your Recent Tickets</CardTitle>
              <CardDescription>Insert Ticket Data Here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="italic text-sm  text-foreground justify-center text-center align-center">
                <p>No ticket data in last 30 days...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
