import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "../components/ui/dropdown-menu";
import { CopyIcon, FlagIcon } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import TextareaField from "@/components/fields/textarea-field.tsx";
import DropdownField from "@/components/fields/dropdown-field.tsx";
import SearchFilterField from "@/components/fields/search-filter-field.tsx";
import DropField from "@/components/fields/drop-field.tsx";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import CheckDropdown from "@/components/fields/check-dropdown.tsx";
import {useTutors} from "@/hooks/use-tutors.ts";
import {Instance} from "@/services/axios.ts";

function DetailLink({ label, content }: any) {
  return (
    <div className="py-2 pl-2">
      <div className="font-base text-xs text-muted-foreground">{label}</div>
      <div className="text-xs text-foreground">{content}</div>
    </div>
  );
}

const FormSchema = z.object({
  id: z.number(),
  description: z.string().min(4).max(500),
  status: z.string().min(1).max(10),
  principal_tutor: z.string().nullable().or(z.number().nullable()),
  assistant_tutor: z.string().nullable().or(z.number().nullable()),
  // was_successful: z.boolean(),
  difficulty: z.string().nullable().optional(),
  flagged: z.boolean(),
});

const instance: Instance = new Instance();

export default function TutorTicketForm({ ticket }: any) {
  const tutors = useTutors();

  const mutation = useMutation({
    mutationFn: instance.updateTicket,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate(data);
    toast({
      title: "Ticket updated!",
      description:
        "The ticket has successfully been updated! Thanks for being epic.",
      className: "text-success border-success",
    });
    form.reset({ ...data }, { keepValues: true });
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: ticket.id,
      description: ticket.description || "",
      status: ticket.status?.name || "",
      principal_tutor: ticket.principal_tutor?.info?.name || "",
      assistant_tutor: ticket.assistant_tutor || "",
      // was_successful: ticket.was_successful,
      difficulty: ticket.difficulty?.name || "",
      flagged: ticket.flagged || false,
    },
  });

  return (
    <div className="backdrop-blur">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-backgroundsecondary">
          <ScrollArea className="max-h-100">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mx-2 h-fit">
                  <AlertDialogHeader>
                    <div className="flex justify-between">
                      <div className="max-w-sm">
                        <div className="flex items-center space-x-2">
                          <AlertDialogTitle className="truncate">
                            {ticket.title}
                          </AlertDialogTitle>
                          <AlertDialogTitle className="text-muted-foreground font-medium">
                            #{ticket.id}
                          </AlertDialogTitle>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="h-8 w-8 p-0">
                                <span className="sr-only">Popout menu</span>
                                <CopyIcon className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  navigator.clipboard.writeText(ticket.id)
                                }
                              >
                                Copy ticket ID
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  navigator.clipboard.writeText(ticket.title)
                                }
                              >
                                Copy ticket title
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  navigator.clipboard.writeText(ticket.title)
                                }
                              >
                                Copy ticket description
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="h-8 w-8 p-0">
                                <span className="sr-only">Popout menu</span>
                                {form.getValues("flagged") == false ? (
                                  <FlagIcon className="h-4 w-4" />
                                ) : (
                                  <FlagIcon className="h-4 w-4 stroke-orange-500" />
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  console.log(
                                    form.setValue(
                                      "flagged",
                                      !form.getValues("flagged"),
                                    ),
                                  );
                                }}
                              >
                                Flag ticket
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <CheckDropdown
                            control={form.control}
                            name="was_successful"
                          />
                        </div>
                      </div>
                      <div>
                        <DropdownField
                          control={form.control}
                          name={"status"}
                          value={ticket.status?.name}
                          items={[
                            { value: 1, text: "New" },
                            { value: 2, text: "Claimed" },
                            { value: 3, text: "Closed" },
                          ]}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 h-full pt-4">
                      <div className="col-span-3 grid grid-cols-1 grid-rows-4 mr-10">
                        <div className="row-span-2">
                          <div className="font-medium text-sm text-foreground">
                            Description
                          </div>
                          <div className="font-medium pb-2 text-xs text-muted-foreground">
                            The description of the ticket, as told by the
                            student.
                          </div>
                          <Separator className="mb-4" />
                          <TextareaField
                            name="description"
                            control={form.control}
                            max_length={500}
                          />
                        </div>
                        <div className="mt-6">
                          <div className="font-medium text-sm text-foreground">
                            Comments
                          </div>
                          <div className="font-medium pb-2 text-xs text-muted-foreground">
                            Share some comments for yourself or other tutors.
                            Comments only viewable by tutors and admins.
                          </div>
                          <Separator className="mb-4" />
                          <Input className="focus:border-none" />
                        </div>
                      </div>
                      <div className="pl-4">
                        <div className="font-medium text-sm text-foreground">
                          Ticket Details
                        </div>
                        <div className="font-medium pb-2 text-xs text-muted-foreground">
                          Information provided by student.
                        </div>
                        <Separator />
                        <DetailLink label="Student" content={ticket.issuing_user?.info?.name} />
                        <DetailLink
                          label="Professor"
                          content={ticket.professor?.info?.name}
                        />
                        <DetailLink label="Course" content={ticket.section?.course?.title} />
                        <DetailLink label="Modality" content="Online" />
                        <div className="font-medium text-sm text-foreground mt-4">
                          Tutor Details
                        </div>
                        <div className="font-medium pb-2 text-xs text-muted-foreground">
                          Information provided by the tutor.
                        </div>
                        <Separator />
                        <DetailLink
                          label="Primary Tutor"
                          content={
                            <SearchFilterField
                              control={form.control}
                              name={"principal_tutor"}
                              value={ticket.principal_tutor?.id}
                              form={form}
                              key={"principal_tutor_key"}
                              items={tutors}
                              submit={onSubmit}
                            />
                          }
                        />
                        <DetailLink
                          label="Assistant Tutor"
                          content={
                            <SearchFilterField
                              control={form.control}
                              name={"asst_tutor"}
                              value={ticket.assistant_tutor?.info && ticket.assistant_tutor?.info?.name}
                              form={form}
                              key={"assistant_tutor"}
                              items={tutors}
                            />
                          }
                        />
                        <DetailLink
                          label="Difficulty"
                          content={
                            <DropField
                              variant="difficulty"
                              control={form.control}
                              name={"difficulty"}
                              value={ticket.status?.name}
                              items={[
                                { value: "EASY", text: "Easy" },
                                { value: "MEDIUM", text: "Medium" },
                                { value: "HARD", text: "Hard" },
                              ]}
                            />
                          }
                        />
                        <div className={`${!form.formState.isDirty && "hidden"} flex justify-end space-x-2`}>
                          <Button
                            onClick={() => form.resetField("description")}
                            disabled={!form.formState.isDirty}
                            variant="outline"
                            className={
                              "mt-4 border-warning/50 text-warning hover:bg-warning/20 hover:text-warning"
                            }
                          >
                            Discard
                          </Button>
                          <Button
                            type="submit"
                            disabled={!form.formState.isDirty}
                            variant="outline"
                            className={"mt-4"}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  </AlertDialogHeader>
                </div>
              </form>
            </Form>
          </ScrollArea>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
