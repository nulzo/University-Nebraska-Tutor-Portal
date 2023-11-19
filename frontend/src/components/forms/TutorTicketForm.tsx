import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Switch } from "@/components/ui/switch";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Textarea } from "../ui/textarea";

function DetailLink({ label, content }: any) {
  return (
    <div className="py-2 pl-2">
      <div className="font-base text-xs text-muted-foreground">{label}</div>
      <div className="text-xs text-foreground">{content}</div>
    </div>
  );
}

function StatusDropdown({ status }: any) {
  return (
    <Select>
      <SelectTrigger className="w-[100px] bg-secondary">
        <SelectValue placeholder={status} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="todo">New</SelectItem>
          <SelectItem value="inprogress">Opened</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function TutorTicketForm({ ticket }: any) {
  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between">
              <div className="max-w-sm">
                <AlertDialogTitle className="truncate">
                  {ticket.title}
                </AlertDialogTitle>
              </div>
              <div>
                <StatusDropdown status={ticket.status} />
              </div>
            </div>
            <div className="grid grid-cols-4 h-full pt-4">
              <div className="col-span-3 grid grid-cols-1 grid-rows-4 mr-10">
                <div className="row-span-3">
                  <div className="font-medium text-sm text-foreground">
                    Description
                  </div>
                  <div className="font-medium pb-2 text-xs text-muted-foreground">
                    The description of the ticket, as told by the student.
                  </div>
                  <Textarea disabled className="disabled:opacity-100 bg-background resize-none flex h-[75%] disabled:cursor-default appearance-none" value={ticket.description} />
                </div>
                <div className="">
                  <div className="font-medium text-sm text-foreground">
                    Comments
                  </div>
                  <div className="font-medium pb-2 text-xs text-muted-foreground">
                    Share some comments for yourself or other tutors. These comments are not viewable by the tutee.
                  </div>
                  <Input />
                </div>
              </div>
              <div className="pl-4">
                <div className="font-medium text-sm text-foreground mb-2 pl-2">
                  Ticket Details
                </div>
                <Separator />
                <DetailLink label="Student" content={ticket.name} />
                <DetailLink label="Professor" content={ticket.professor} />
                <DetailLink label="Course" content={ticket.course} />
                <DetailLink
                  label="Successful"
                  content={<Switch className="mt-1" />}
                />
                <div className="font-medium text-sm text-foreground mb-2 mt-4 pl-2">
                  Tutor Details
                </div>
                <Separator />
                <DetailLink label="Tutor" content={ticket.course} />
                <DetailLink label="Assistant Tutor" content={ticket.course} />
                <DetailLink label="Difficulty" content={ticket.course} />
              </div>
            </div>
          </AlertDialogHeader>
          <div className="flex h-10 space-x-2 content-end align-baseline justify-end items-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Save</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
