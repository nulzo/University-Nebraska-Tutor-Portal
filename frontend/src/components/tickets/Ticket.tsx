import { CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import TutorTicketForm from "../forms/TutorTicketForm";

export default function Ticket({
  name,
  description,
  professor,
  section,
  type,
}: any) {
  const ticketData = {
    "name": name,
    "description": description,
    "professor": professor,
    "section": section,
    "type": type
  }
  return (
    <div className="border rounded-lg text-foreground px-4 pt-4">
      <div className="flex justify-between">
        <CardTitle>{name}</CardTitle>
        <Button variant="outline" className=" px-1 py-1">
            <TutorTicketForm ticketData={ticketData}/>
          </Button>
      </div>
      <CardDescription className="">{description}</CardDescription>
      <div className="flex justify-between align-start items-end mt-2 mb-4">
        <Label className="flex">
          <div className="hidden sm:block">{professor} -</div>
          <div>{section}</div>
        </Label>
        <div className="flex space-x-4">
        {type === "new" && <Badge variant={"outline"}>Unclaimed</Badge>}
        {type === "opened" && <Badge variant={"outline"}>Claimed</Badge>}
        {type === "closed" && <Badge variant="outline">Closed</Badge>}
        </div>
      </div>
    </div>
  );
}
