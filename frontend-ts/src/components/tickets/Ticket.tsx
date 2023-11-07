import { ClipboardEditIcon, Trash2Icon } from "lucide-react";
import {
  CardDescription,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";

export default function Ticket({
  name,
  description,
  start_time,
  professor,
  section,
  tutor,
  type,
}: any) {
  return (
    <div className="border rounded-lg text-foreground px-4 pt-4">
      <div className="flex justify-between">
        <CardTitle>{name}</CardTitle>
        {type === "new" && <Badge variant={"new_ticket"}>Unclaimed</Badge>}
        {type === "opened" && (
          <Badge variant={"opened_ticket"}>Claimed</Badge>
        )}
      </div>
      <CardDescription className="">{description}</CardDescription>
      <div className="flex justify-between align-start items-end mt-2 mb-4">
        <Label>
          {professor} - {section}
        </Label>
        <div className="flex space-x-4">
          <Trash2Icon size={20} />
          <ClipboardEditIcon size={20} />
        </div>
      </div>

    </div>
  );
}
