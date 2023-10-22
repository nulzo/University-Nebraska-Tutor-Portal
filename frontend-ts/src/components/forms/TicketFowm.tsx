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
import { toast } from "@/components/ui/use-toast";

const languages = [
  { label: "English", value: "English" },
  { label: "French", value: "French" },
  { label: "German", value: "German" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

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
  email: z
    .string({
      required_error: "enter your UNO email.",
    })
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
  tutor: z
    .string({
      required_error: "enter a tutor name.",
    })
    .min(4, {
      message: "tutor name must be more than 4 characters.",
    })
    .max(50, {
      message: "tutor name must not be more than 50 characters.",
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

function onSubmit(data: z.infer<typeof FormSchema>) {
  toast({
    title: "You submitted the following values:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  });
}

export default function TicketForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const max_length = max_ticket_length;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="student_name"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Your Name</FormLabel>
              <FormControl>
                <Input
                  className="text-foreground"
                  value="Nolan Gregory"
                  disabled
                  placeholder="enter title here..."
                  //   {...field}
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
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Your email</FormLabel>
              <FormControl>
                <Input
                  className="text-foreground"
                  value="nolangregory@unomaha.edu"
                  disabled
                  placeholder="enter title here..."
                  //   {...field}
                />
              </FormControl>
              <FormDescription>
                Your UNO email will be autofilled if on your file.
              </FormDescription>
              <FormMessage className="text-warning" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="professor"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="space-y-0.5 flex flex-row items-center justify-between rounded-lg border p-4">
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
                            ? languages.find(
                                (language) => language.value === field.value
                              )?.label
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
                          {languages.map((language) => (
                            <CommandItem
                              value={language.label}
                              key={language.value}
                              onSelect={() => {
                                form.setValue("professor", language.value);
                              }}
                            >
                              {language.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  language.value === field.value
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
        <FormField
          control={form.control}
          name="section"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="space-y-0.5 flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Course</FormLabel>
                  <FormDescription>
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
                          className={cn(
                            "w-[250px] justify-between ",
                            !field.value && "text-muted-foreground font-normal"
                          )}
                        >
                          {field.value
                            ? languages.find(
                                (language) => language.value === field.value
                              )?.label
                            : "select a course"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="search courses..."
                          className="h-9 my-1"
                        />
                        <CommandEmpty>no courses found...</CommandEmpty>
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              value={language.label}
                              key={language.value}
                              onSelect={() => {
                                form.setValue("section", language.value);
                              }}
                            >
                              {language.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  language.value === field.value
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
        <FormField
          control={form.control}
          name="issue"
          render={({ field }) => (
            <FormItem className="">
              <div className="space-y-0.5 flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className=" text-foreground">Issue type</FormLabel>
                  <FormDescription className="text-muted-foreground">
                    Select the issue you are having.
                  </FormDescription>
                </div>
                <div>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="text-foreground w-[250px]">
                        <SelectValue>
                          {field.value || (
                            <span className="text-muted-foreground">
                              select an issue type
                            </span>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="info">Informative</SelectItem>
                      <SelectItem value="alert">Alert</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="tutor">Tutors Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-warning mt-1" />
                </div>
              </div>
            </FormItem>
          )}
        />
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
