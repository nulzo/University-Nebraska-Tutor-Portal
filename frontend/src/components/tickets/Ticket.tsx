import { CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import TutorTicketForm from "../forms/TutorTicketForm";

export default function Ticket({ ticket }: any) {
  return (
    <div className="border rounded-xl text-foreground px-4 pt-4">
      <div className="flex justify-between">
        <CardTitle>{ticket.name}</CardTitle>
        <Button variant="outline" className=" px-1 py-1">
          <TutorTicketForm ticket={ticket} />
        </Button>
      </div>
      <CardDescription className="">{ticket.description}</CardDescription>
      <div className="flex justify-between align-start items-end mt-2 mb-4">
        <Label className="flex">
          <div className="hidden sm:block">{ticket.professor} -</div>
          <div>{ticket.course}</div>
        </Label>
        <div className="flex space-x-4">
          {ticket.status === "NEW" && <Badge variant={"outline"}>NEW</Badge>}
          {ticket.status === "OPENED" && (
            <Badge variant={"outline"}>OPENED</Badge>
          )}
          {ticket.status === "CLOSED" && (
            <Badge variant="outline">CLOSED</Badge>
          )}
        </div>
      </div>
    </div>
  );
}
