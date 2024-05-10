import { CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import TutorTicketForm from "@/forms/tutor-ticket-form.tsx";
import { CSCIIcon } from "@/components/assets/department-icons.tsx";
import { CheckIcon, CircleDashedIcon, CircleIcon, XIcon } from "lucide-react";

export default function Ticket({ ticket }: any) {
  return (
    <div className="border rounded-xl text-foreground px-4 pt-2">
      <div className="flex justify-between align-middle items-center mb-2">
        <div className="flex max-h-10 space-x-2 align-middle items-center">
          <CardTitle className="font-base text-lg flex items-start content-start align-top">
            {ticket.title}
          </CardTitle>
          {ticket.status === "CLOSED" &&
            (ticket.was_successful ? (
              <CheckIcon size="15" className="text-success" />
            ) : (
              <XIcon size="15" className="text-error" />
            ))}
          {ticket.status === 1 && (
            <div className="relative">
              <CircleDashedIcon
                width={16}
                height={16}
                viewBox="0 0 24 24"
                className="text-notification absolute"
              />
              <span className="bg-notification animate-notif">
                <CircleDashedIcon
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  className="text-notification brightness-200"
                />
              </span>
            </div>
          )}
          {ticket.status === "OPENED" && <CircleIcon size="15" />}
        </div>
        <TutorTicketForm ticket={ticket} />
      </div>
      <CardDescription className="">{ticket.description}</CardDescription>
      <div className="flex justify-between align-start items-end mt-2 mb-4">
        <Label className="flex space-x-2">
          <CSCIIcon />
          <div className="hidden sm:block">{ticket.professor}</div>
          <p>-</p>
          <div className="max-w-[200px] truncate">{ticket.course}</div>
        </Label>
      </div>
    </div>
  );
}
