import Header from "../typography/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "../charts/Charts";
import { Badge, Link } from "@radix-ui/themes";

export default function Home() {
  return (
    <div>
      <Header text="Welcome back, Nolan."></Header>
      <div className="flex flex-col sm:block space-y-4">
        <div className="grid gap-4">
          <Card className="w-[100%]">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  <p>Recent Announcements</p>
                  <p className="animate-pulse">
                    <Badge color="cyan">New</Badge>
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
                <Link weight={"bold"}>How to Access the Dark Web?</Link>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis quaerat repellendus aut expedita at rem,
                  provident laborum eius, neque
                </p>
              </div>
              <div>
                <Link weight={"bold"}>What Goes Into a Good Ticket?</Link>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <div>
                <Link weight={"bold"}>How to Access the Dark Web</Link>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis quaerat repellendus aut expedita at rem,
                  provident laborum eius, neque
                </p>
              </div>
              <div>
                <Link weight={"bold"}>How to Access the Dark Web</Link>
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
              <div className="italic text-sm text-stone-400 justify-center text-center align-center">
                <p>No ticket data in last 30 days...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
