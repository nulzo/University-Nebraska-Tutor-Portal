import { CardDescription, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import TutorTicketForm from "../forms/TutorTicketForm";
import CSCIIcon from "../assets/CSCIIcon";
import { AlertCircle, AlertTriangleIcon, CheckIcon, CircleDashedIcon, PlusCircleIcon, PlusIcon, XIcon } from "lucide-react";

export default function Ticket({ ticket }: any) {
  return (
    <div className="border rounded-xl text-foreground px-4 pt-2">
      <div className="flex justify-between align-middle items-center mb-2">
        <div className="flex max-h-10 space-x-2 align-middle items-center">
          <CardTitle className="font-base text-lg flex items-start content-start align-top">
            {ticket.title}
          </CardTitle>
          {ticket.status === "CLOSED" && (
            ticket.was_successful === true ? <CheckIcon size="15" className="text-success" /> : <XIcon size="15" className="text-error" />
          )}
          {ticket.status === "NEW" && (
            <div className="relative">
              <AlertCircle size="16" className="text-purple-400 absolute" />
              <span className="bg-purple-400 animate-ping">
                <AlertCircle size="16" className="text-white" />
              </span>
            </div>
          )}
          {ticket.status === "OPENED" && (
            <CircleDashedIcon size="15" />
          )}
        </div>
        <TutorTicketForm ticket={ticket} />
      </div>
      <CardDescription className="">{ticket.description}</CardDescription>
      <div className="flex justify-between align-start items-end mt-2 mb-4">
        <Label className="flex space-x-2">
          <CSCIIcon />
          <div className="hidden sm:block">{ticket.professor}</div>
          <p>
            -
          </p>
          <div className="max-w-[200px] truncate">{ticket.course}</div>
        </Label>
      </div>
    </div>
  );
}
