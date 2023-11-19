import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Switch } from "@/components/ui/switch";

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
      <SelectTrigger className="w-[100px]">
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
          <Button variant="ghost" className="text-xs p-2">
            ...
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
              <div className="col-span-3">
                <div className=" min-h-[50%]">
                  <div className="font-medium text-sm text-foreground mb-2">
                    Description
                  </div>
                  <AlertDialogDescription>
                    {ticket.description}
                  </AlertDialogDescription>
                </div>
                <div>
                  <div className="font-medium pb-2 text-sm text-foreground">
                    Comments
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
