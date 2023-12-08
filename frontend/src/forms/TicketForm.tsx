import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useFetchProfessor from "@/API/professors/useFetchProfessor";
import useFetchCourse from "@/API/courses/useFetchCourse";
import useFetchIssue from "@/API/issues/useFetchIssue";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadingSelect from "@/components/fields/loading_select";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { createTicket } from "@/API/tickets/ticketRequests";
import { useNavigate } from "react-router-dom";

const max_ticket_length = 500;

const FormSchema = z.object({
  name: z
    .string({
      required_error: "you must enter your name.",
    })
    .min(4, {
      message: "name must be more than 4 characters.",
    })
    .max(50, {
      message: "name must not be more than 50 characters.",
    }),
  title: z
    .string({
      required_error: "you must enter a title.",
    })
    .min(4, {
      message: "title must be 4 characters long.",
    })
    .max(50, {
      message: "title must not be greater than 50 characters.",
    }),
  professor: z.number({
    required_error: "you must select a professor.",
  }),
  course: z.number({
    required_error: "you must select a course.",
  }),
  issue: z.number({
    required_error: "you must select an issue type.",
  }),
  description: z
    .string({
      required_error: "you must enter a description.",
    })
    .min(10, {
      message: "description must be more than 10 characters.",
    })
    .max(max_ticket_length, {
      message: `description must not be more than ${max_ticket_length} characters.`,
    }),
});

function TicketLabel({ children }: any) {
  return (
    <div className="font-medium leading-4 text-sm text-foreground">
      {...children}
    </div>
  );
}

function TicketDescription({ children }: any) {
  return (
    <div className="font-base text-[0.8rem] pb-2 text-muted-foreground">
      {...children}
    </div>
  );
}

export default function TicketForm() {
  const professors = useFetchProfessor();
  // const sections = useFetchSection();
  const issues = useFetchIssue();
  const courses = useFetchCourse();
  const max_length = max_ticket_length;
  const { toast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createTicket,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate(data);
    toast({
      title: `Thanks, ${data.name}!`,
      description:
        "We have successfully recieved your ticket, and a tutor will be with you shortly to assist you.",
      className: "text-success border-success",
    });
    console.log(data)
    navigate("/home");
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      title: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            key="student-name-input"
            render={({ field }: any) => (
              <FormItem className="space-y-2">
                <TicketLabel>Full Name</TicketLabel>
                <FormControl>
                  <Input
                    className="text-foreground"
                    placeholder="Your name here..."
                    autoComplete="off"
                    autoCorrect="false"
                    {...field}
                  />
                </FormControl>
                <TicketDescription>
                  If you prefer to go by a different name than what is listed
                  here, navigate to the "Profile" tab and change it.
                </TicketDescription>
                <FormMessage className="text-warning" />
              </FormItem>
            )}
          />
          {professors?.isFetching && (
            <div className="space-y-0.5 block md:flex md:flex-row items-center justify-between rounded-lg md:border md:p-4 text-foreground">
              <div className="space-y-0.5 pb-2 md:pb-0">
                <FormLabel>Professor</FormLabel>
                <FormDescription className="hidden md:block">
                  Select the professor teaching the course.
                </FormDescription>
              </div>
              <div className="">
                <LoadingSelect />
              </div>
            </div>
          )}
          {!professors?.isLoading && (
            <FormField
              control={form.control}
              name="professor"
              render={({ field }: any) => (
                <FormItem className="block md:flex md:flex-col">
                  <div className="space-y-0.5 block md:flex md:flex-row items-center justify-between rounded-lg md:border md:p-4 text-foreground">
                    <div className="space-y-0.5 pb-2 md:pb-0">
                      <FormLabel>Professor</FormLabel>
                      <FormDescription className="hidden md:block">
                        Select the professor teaching the course.
                      </FormDescription>
                    </div>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="dropdown"
                              role="combobox"
                              className={cn(
                                "w-full md:w-[35vw] lg:w-[30vw] xl:w-[40vw] justify-between",
                                !field.value &&
                                "text-muted-foreground font-normal",
                              )}
                            >
                              {field.value
                                ? professors?.data.find(
                                  (professor: any) =>
                                    professor.professor_id === field.value,
                                )?.full_name
                                : "select a professor"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[70vw] h-full md:w-[35vw] lg:w-[30vw] xl:w-[40vw] md:h-[30vh] lg:h-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="search professors..."
                              className="h-9 my-1"
                            />
                            <CommandEmpty>no professors found...</CommandEmpty>
                            <CommandGroup>
                              <ScrollArea className="h-[25vh] md:h-72 rounded-md border">
                                {professors?.data.map((professor: any) => (
                                  <CommandItem
                                    value={professor.full_name}
                                    key={`${professor.professor_id}-${professor.last_name}`}
                                    onSelect={() => {
                                      form.setValue(
                                        "professor",
                                        professor.professor_id,
                                      );
                                    }}
                                  >
                                    {professor.full_name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        professor.full_name === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          )}
          {courses?.isFetching && (
            <div className="space-y-0.5 block md:flex md:flex-row items-center justify-between rounded-lg md:border md:p-4 text-foreground">
              <div className="space-y-0.5 pb-2 md:pb-0">
                <FormLabel>Course</FormLabel>
                <FormDescription className="hidden md:block">
                  Select the course that you are coming in for help with.
                </FormDescription>
              </div>
              <div className="">
                <LoadingSelect />
              </div>
            </div>
          )}
          {!courses?.isLoading && (
            <FormField
              control={form.control}
              name="course"
              key="course_field"
              render={({ field }: any) => (
                <FormItem className="flex flex-col" key="course_form_item">
                  <div className="space-y-0.5 block md:flex md:flex-row items-center justify-between rounded-lg md:border md:p-4 text-foreground">
                    <div className="space-y-0.5 pb-2 md:pb-0">
                      <FormLabel key="course_form_label">Course</FormLabel>
                      <FormDescription className="hidden md:block">
                        Select the course that you are coming in for help with.
                      </FormDescription>
                    </div>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="dropdown"
                              role="combobox"
                              key="course_button"
                              className={cn(
                                "w-full md:w-[35vw] lg:w-[30vw] xl:w-[40vw] justify-between",
                                !field.value &&
                                "text-muted-foreground font-normal",
                              )}
                            >
                              {field.value
                                ? courses?.data.find(
                                  (course: any) => course.id === field.value,
                                )?.course_code
                                : "select a course"}
                              <CaretSortIcon
                                key="course_sort_icon"
                                className="ml-2 h-4 w-4 shrink-0"
                              />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          key="course_content"
                          className="w-[70vw] h-full md:w-[35vw] lg:w-[30vw] xl:w-[40vw] md:h-[30vh] lg:h-full p-0"
                        >
                          <Command>
                            <CommandInput
                              placeholder="search courses..."
                              className="h-9 my-1"
                              key="course_input"
                            />
                            <CommandEmpty>no courses found...</CommandEmpty>
                            <CommandGroup key="course_command_group">
                              <ScrollArea className="h-72 rounded-md border">
                                {courses?.data.map((course: any) => (
                                  <CommandItem
                                    value={`${course.course_code} - ${course.course_name}`}
                                    key={`${course.course_code}-${course.course_name}`}
                                    onSelect={() => {
                                      {
                                        form.setValue("course", course.id);
                                      }
                                    }}
                                  >
                                    {course.course_code} - {course.course_name}
                                    <CheckIcon
                                      key="course_check_icon"
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        course.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          )}
          {issues?.isFetching && (
            <div className="space-y-0.5 block md:flex md:flex-row items-center justify-between rounded-lg md:border md:p-4 text-foreground">
              <div className="space-y-0.5 pb-2 md:pb-0">
                <FormLabel>Issue</FormLabel>
                <FormDescription className="hidden md:block">
                  Select the Issue that you are having.
                </FormDescription>
              </div>
              <div className="">
                <LoadingSelect />
              </div>
            </div>
          )}
          {!issues?.isLoading && (
            <FormField
              control={form.control}
              name="issue"
              key="issue_field"
              render={({ field }: any) => (
                <FormItem className="flex flex-col" key="issue_form_item">
                  <div className="space-y-0.5 block md:flex md:flex-row items-center justify-between rounded-lg md:border md:p-4 text-foreground">
                    <div className="space-y-0.5 pb-2 md:pb-0">
                      <FormLabel key="issue_form_label">Issue</FormLabel>
                      <FormDescription
                        key="issue_form_description"
                        className="hidden md:block"
                      >
                        Select the Issue that you are having.
                      </FormDescription>
                    </div>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="dropdown"
                              role="combobox"
                              key="issue_button"
                              className={cn(
                                "w-full md:w-[35vw] lg:w-[30vw] xl:w-[40vw] justify-between",
                                !field.value &&
                                "text-muted-foreground font-normal",
                              )}
                            >
                              {field.value
                                ? issues?.data.find(
                                  (issue: any) =>
                                    issue.issue_id === field.value,
                                )?.problem_type
                                : "select an issue"}
                              <CaretSortIcon
                                key="issue_sort_icon"
                                className="ml-2 h-4 w-4 shrink-0"
                              />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          key="issue_content"
                          className="w-[70vw] h-full md:w-[35vw] lg:w-[30vw] xl:w-[40vw] md:h-[30vh] lg:h-full p-0"
                        >
                          <Command>
                            <CommandInput
                              placeholder="search issues..."
                              className="h-9 my-1"
                              key="issue_input"
                            />
                            <CommandEmpty>no issues found...</CommandEmpty>
                            <CommandGroup key="issue_command_group">
                              <ScrollArea className="h-fit rounded-md border">
                                {issues?.data.map((issue: any) => (
                                  <CommandItem
                                    value={issue.problem_type}
                                    key={`${issue.issue_id}${issue.problem_type}`}
                                    onSelect={() => {
                                      {
                                        form.setValue("issue", issue.issue_id);
                                      }
                                    }}
                                  >
                                    {issue.problem_type}
                                    <CheckIcon
                                      key={`issue-${issue.issue_id}-check-icon`}
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        issue.issue_id === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="title"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel className="text-foreground">Brief Summary</FormLabel>
                <FormControl>
                  <Input
                    className="text-foreground"
                    placeholder="enter summary here..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please state your assignment and briefly explain your issue.
                </FormDescription>
                <FormMessage className="text-warning" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel className="text-foreground">
                  Ticket Description
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    {field.value && field.value.length > max_length && (
                      <p className="absolute top-0 right-0 text-warning font-bold text-xs pr-2 pt-1">
                        {(field.value && max_length - field.value.length) ||
                          max_length}
                      </p>
                    )}
                    {field.value && field.value.length <= max_length && (
                      <p className="absolute top-0 right-0 text-muted-foreground/50 text-xs pr-2 pt-1">
                        {max_length - field.value.length}
                      </p>
                    )}
                    {!field.value && (
                      <p className="absolute top-0 right-0 text-muted-foreground/50 text-xs pr-2 pt-1">
                        {max_length}
                      </p>
                    )}
                    <Textarea
                      className="text-foreground resize-none min-h-[15vh]"
                      placeholder="enter description here..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Please describe in as much detail the question in which you
                  are seeking help with.
                </FormDescription>
                <FormMessage className="text-warning" />
              </FormItem>
            )}
          />
          <Button disabled={mutation.isPending} type="submit">
            Submit Ticket
          </Button>
        </form>
      </Form>
    </>
  );
}
