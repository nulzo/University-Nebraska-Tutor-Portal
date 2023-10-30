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
import { ScrollArea } from "../ui/scroll-area";
import axios from "axios";
// import useFetchSection from "@/API/sections/useFetchSection";

const max_ticket_length = 500;

const FormSchema = z.object({
  student_name: z
    .string({
      required_error: "you must enter your name.",
    })
    .min(4, {
      message: "name must be more than 4 characters.",
    })
    .max(50, {
      message: "name must not be more than 50 characters.",
    }),
  student_email: z
    .string({
      required_error: "you must enter your email.",
    })
    .email()
    .min(4, {
      message: "email must be a valid email.",
    })
    .max(50, {
      message: "email must not be greater than 50 characters.",
    })
    .email({
      message: "enter a valid email",
    }),
  professor: z
    .number({
      required_error: "you must select a professor.",
    }),
  section: z
    .number({
      required_error: "you must select a course.",
    }),
  issue: z
    .number({
      required_error: "you must select an issue type.",
    }),
  body: z
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

export default function TicketForm() {
  const professors = useFetchProfessor();
  // const sections = useFetchSection();
  const issues = useFetchIssue();
  const courses = useFetchCourse();
  const max_length = max_ticket_length;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    axios
      .post("http://localhost:6969/api/tickets/", {
        name: data.student_name,
        description: data.body,
        professor: data.professor,
        course: data.section,
        issue: data.issue,

      })
      .then(function (response) {
        console.log(response);
      })
      .catch((error) => console.log("ERROR:", error));
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      student_name: "",
      student_email: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="student_name"
            key="student-name-input"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Your Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-foreground"
                    placeholder="enter name here..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  If you prefer to go by a different name than what is listed
                  here, navigate to the "Settings" tab and change it.
                </FormDescription>
                <FormMessage className="text-warning" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="student_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Your email</FormLabel>
                <FormControl>
                  <Input
                    className="text-foreground"
                    placeholder="enter title here..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your UNO email will be autofilled if on your file.
                </FormDescription>
                <FormMessage className="text-warning" />
              </FormItem>
            )}
          />
          {!professors?.isLoading && (
            <FormField
              control={form.control}
              name="professor"
              render={({ field }) => (
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
                                "w-full md:w-[250px] justify-between",
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
                        <PopoverContent className="w-[70vw] h-full md:w-[300px] md:h-[30vh] p-0">
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
                                      )
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
          {!courses?.isLoading && (
            <FormField
              control={form.control}
              name="section"
              key="course_field"
              render={({ field }) => (
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
                                "w-full md:w-[250px] justify-between",
                                !field.value &&
                                "text-muted-foreground font-normal",
                              )}
                            >
                              {field.value
                                ? courses?.data.find(
                                  (course: any) =>
                                    course.id === field.value,
                                )?.course_name
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
                          className="w-[70vw] md:w-[300px] p-0"
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
                                    value={course.course_name}
                                    key={`${course.course_code}-${course.course_name}`}
                                    onSelect={() => {
                                      {
                                        form.setValue(
                                          "section",
                                          course.id,
                                        )
                                      }
                                    }}
                                  >
                                    {course.course_name}
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
          {!issues?.isLoading && (
            <FormField
              control={form.control}
              name="issue"
              key="issue_field"
              render={({ field }) => (
                <FormItem className="flex flex-col" key="issue_form_item">
                  <div className="space-y-0.5 block md:flex md:flex-row items-center justify-between rounded-lg md:border md:p-4 text-foreground">
                    <div className="space-y-0.5 pb-2 md:pb-0">
                      <FormLabel key="issue_form_label">Issue</FormLabel>
                      <FormDescription key="issue_form_description" className="hidden md:block">
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
                                "w-full md:w-[250px] justify-between",
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
                          className="w-[70vw] md:w-[300px] p-0"
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
                                        form.setValue(
                                          "issue",
                                          issue.issue_id,
                                        )
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
            name="body"
            render={({ field }) => (
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
                  Please describe in as much detail the question in which you are
                  seeking help with.
                </FormDescription>
                <FormMessage className="text-warning" />
              </FormItem>
            )}
          />
          <Button type="submit">Submit Ticket</Button>
        </form>
      </Form>
    </>
  );
}
