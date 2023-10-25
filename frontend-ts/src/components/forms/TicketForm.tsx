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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import axios from "axios";
import useFetchProfessor from "@/API/professors/useFetchProfessor";
import useFetchCourse from "@/API/courses/useFetchCourse";
import useFetchIssue from "@/API/issues/useFetchIssue";
import useFetchSection from "@/API/sections/useFetchSection";

const max_ticket_length = 500;

const FormSchema = z.object({
  student_name: z
    .string({
      required_error: "enter a title for the announcement.",
    })
    .min(8, {
      message: "title must be more than 4 characters.",
    })
    .max(30, {
      message: "title must not be more than 30 characters.",
    }),
  student_email: z
    .string({
      required_error: "enter your UNO email.",
    }).email()
    .min(4, {
      message: "email must be a valid UNO email.",
    })
    .max(30, {
      message: "email must not be greater than 50 characters.",
    })
    .email({
      message: "enter a valid UNO email.",
    }),
  professor: z
    .string({
      required_error: "enter a professor for the course.",
    })
    .min(4, {
      message: "professor name must be more than 4 characters.",
    })
    .max(50, {
      message: "professor name must not be more than 50 characters.",
    }),
  section: z
    .string({
      required_error: "enter a course section.",
    })
    .min(4, {
      message: "course section must be more than 4 characters.",
    })
    .max(50, {
      message: "course section must not be more than 50 characters.",
    }),
  issue: z
    .string({
      required_error: "select an issue describing the ticket.",
    })
    .min(4, {
      message: "issue type must be more than 4 characters.",
    })
    .max(50, {
      message: "issue type must not be more than 50 characters.",
    }),
  body: z
    .string({
      required_error: "enter a description for the ticket.",
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
  const sections = useFetchSection();
  const issues = useFetchIssue();
  const courses = useFetchCourse();
  const max_length = max_ticket_length;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    axios.post("http://localhost:6969/api/tickets/", {
      name: data.student_name,
      description: data.body,
      professor: data.professor,
      section: data.section,
      issue: data.issue,
      student: data.student_name
    }).then(function (response) {
      console.log(response);
    }).catch((error) => console.log("ERROR:", error));
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      student_name: "Nolan Gregory",
      student_email: "nolangregory@unomaha.edu"
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="student_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Your Name</FormLabel>
              <FormControl>
                <Input
                  className="text-muted-foreground"
                  placeholder="enter title here..."
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
                  className="text-muted-foreground"
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
        {!professors?.isLoading &&
          <FormField
            control={form.control}
            name="professor"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="space-y-0.5 flex flex-row items-center justify-between rounded-lg border p-4 text-foreground">
                  <div className="space-y-0.5">
                    <FormLabel>Professor</FormLabel>
                    <FormDescription>
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
                              "w-[250px] justify-between",
                              !field.value && "text-muted-foreground font-normal"
                            )}
                          >
                            {field.value
                              ? professors.data.find(
                                (professor: any) => professor.full_name === field.value
                              )?.full_name
                              : "select a professor"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="search professors..."
                            className="h-9 my-1"
                          />
                          <CommandEmpty>no professors found...</CommandEmpty>
                          <CommandGroup>
                            {professors.data.map((professor: any) => (
                              <CommandItem
                                value={professor.full_name}
                                key={professor.id}
                                onSelect={() => {
                                  form.setValue("professor", professor.full_name);
                                }}
                              >
                                {professor.full_name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    professor.full_name === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
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
        }
        {!courses?.isLoading &&
          <FormField
            control={form.control}
            name="section"
            key="course_field"
            render={({ field }) => (
              <FormItem className="flex flex-col" key="course_form_item">
                <div className="space-y-0.5 flex flex-row items-center justify-between rounded-lg border p-4 text-foreground">
                  <div className="space-y-0.5">
                    <FormLabel key="course_form_label">Course</FormLabel>
                    <FormDescription key="course_form_description">
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
                              "w-[250px] justify-between",
                              !field.value && "text-muted-foreground font-normal"
                            )}
                          >
                            {field.value
                              ? courses.data.find(
                                (course: any) => course.course_name === field.value
                              )?.course_name
                              : "select a course"}
                            <CaretSortIcon key="course_sort_icon" className="ml-2 h-4 w-4 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent key="course_content" className="w-[300px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="search courses..."
                            className="h-9 my-1"
                            key="course_input"
                          />
                          <CommandEmpty>no courses found...</CommandEmpty>
                          <CommandGroup key="course_command_group">
                            {courses?.data.map((course: any) => (
                              <CommandItem
                                value={course.course_name}
                                key={course.id}
                                onSelect={() => {
                                  {
                                    course.course_name &&
                                      form.setValue("section", course.course_name);
                                  }
                                }}
                              >
                                {course.course_name}
                                <CheckIcon
                                  key="course_check_icon"
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    course.course_name === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
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
        }
        {!issues?.isLoading &&
          <FormField
            control={form.control}
            name="issue"
            key="issue_field"
            render={({ field }) => (
              <FormItem className="" key="issue_form_item">
                <div className="space-y-0.5 flex flex-row items-center justify-between rounded-lg border p-4 text-foreground">
                  <div className="space-y-0.5">
                    <FormLabel key="issue_form_label" className=" text-foreground">Issue type</FormLabel>
                    <FormDescription key="issue_form_description" className="text-muted-foreground">
                      Select the issue you are having.
                    </FormDescription>
                  </div>
                  <div>
                    <Select onValueChange={field.onChange} key="issue_select">
                      <FormControl>
                        <SelectTrigger className="text-foreground w-[250px]" key="issue_select_trigger">
                          <SelectValue key="issue_value">
                            {field.value || (
                              <span className="text-muted-foreground">
                                select an issue type
                              </span>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent key="issue_select_content">
                        {issues?.data.map((issue: any) => (
                          <SelectItem value={issue.problem_type} key={`issue_${issue.id}`}>{issue.problem_type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-warning mt-1" />
                  </div>
                </div>
              </FormItem>
            )}
          />
        }
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
  );
}

