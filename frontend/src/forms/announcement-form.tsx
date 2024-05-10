/**
 * AnnouncementForm React Component Documentation
 * -------------------------------------------------------------
 * The `AnnouncementForm` component is a React form used for creating announcements. It includes fields for the announcement title,
 * body, variant, start date, end date, and an option to show dates. The form provides input validation, dynamic character count display,
 * date selection using a calendar, and announcement type selection using a dropdown.
 *
 * Overview:
 * - **Form Initialization**: The form is initialized using the `useForm` hook from `react-hook-form`. It uses the `FormSchema` provided by
 * the `zod` library for validation.
 *
 * - **Form Submission**: The form submission is handled by the `onSubmit` function, which displays a toast message with the submitted values.
 *
 * - **Form Fields and Validation**: Various form fields are utilized, including `Input`, `Textarea`, `Select`, and custom components such
 * as `Switch`. The form includes validation for title, body, variant, start date, end date, and show date.
 *
 * - **Popover and Calendar**: The form uses a `Popover` with a `Calendar` component for date selection, providing an interactive calendar
 * for users to choose start and end dates.
 *
 * - **Character Count Display**: The character count for the announcement body is dynamically displayed, providing visual feedback to users.
 *
 * - **Toast Message**: A toast message is displayed upon successful form submission, showing the submitted values.
 *
 * Usage:
 * To use the `AnnouncementForm` component, integrate it into the desired page or component. The form handles the creation of new announcements,
 * including input validation, dynamic character count display, and date selection.
 *
 * Example:
 * ```jsx
 * import AnnouncementForm from "@/path/to/AnnouncementForm";
 *
 * function CreateAnnouncementPage() {
 *   return (
 *     <div>
 *       <h1>Create a New Announcement</h1>
 *       <AnnouncementForm />
 *     </div>
 *   );
 * }
 * ```
 *
 * This documentation provides an overview of the `AnnouncementForm` component and its key features. For more detailed information on specific
 * functions or components, refer to the source code and relevant inline comments.
 */
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
import {useMutation} from "@tanstack/react-query";
import {Instance} from "@/services/axios.ts";

const max_announcement_length = 255;
const instance: Instance = new Instance();

const FormSchema = z.object({
  title: z
    .string({
      required_error: "enter a title for the announcement.",
    })
    .min(4, {
      message: "title must be more than 4 characters.",
    })
    .max(30, {
      message: "title must not be more than 30 characters.",
    }),
  content: z
    .string({
      required_error: "enter a body for the announcement.",
    })
    .min(4, {
      message: "body must be more than 4 characters.",
    })
    .max(max_announcement_length, {
      message: `body must not be more than ${max_announcement_length} characters.`,
    }),
  type: z.number({
    required_error: "enter a variant for the announcement.",
  }).or(z.string()),
  start_date: z.date({
    required_error: "enter a start date for the announcement.",
  }),
  end_date: z.date({
    required_error: "enter an end date for the announcement.",
  }),
  visible_end_date: z
    .boolean({
      invalid_type_error: "erm... you really broke something...",
    })
    .default(false),
});

export default function AnnouncementForm() {
  const mutation = useMutation({
    mutationFn: instance.createAnnouncement,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    data.type = 1;
    // data.issuing_user = 1;
    mutation.mutate(data);
    if (mutation.isSuccess) {
      toast({
        title: "Success! You submitted the following values:",
        description: (
            <pre className="mt-2 w-[340px] rounded-md bg-background border-success p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
        ),
      });
    }
    else {
      toast({
        title: "FAILUTE! YOU SUCKS!!!!",
        description: (
            <div>!</div>
        ),
        className: "border border-red"
      });
    }
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const max_length = 255;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                Announcement title
              </FormLabel>
              <FormControl>
                <Input
                  className="text-foreground"
                  placeholder="enter title here..."
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage className="text-warning" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                Announcement body
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
                    placeholder="enter body here..."
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-warning" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="">
              <div className="space-y-0.5 flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className=" text-foreground">
                    Announcement type
                  </FormLabel>
                  <FormDescription className="text-muted-foreground">
                    Select the variant of announcement that is displayed.
                  </FormDescription>
                </div>
                <div>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="text-foreground w-[240px]">
                        <SelectValue>
                          {field.value || (
                            <span className="text-muted-foreground hover:text-foreground">
                              select an announcement type
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
          name="start_date"
          render={({ field }) => (
            <FormItem className="">
              <div className="space-y-0.5 flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className=" text-foreground">Start date</FormLabel>
                  <FormDescription className="text-muted-foreground">
                    Select the start date of the announcement.
                  </FormDescription>
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal text-foreground",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>select start date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-warning mt-1" />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem className="">
              <div className="space-y-0.5 flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className=" text-foreground">Start date</FormLabel>
                  <FormDescription className="text-muted-foreground">
                    Select the start date of the announcement.
                  </FormDescription>
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal text-foreground",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>select end date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-warning" />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visible_end_date"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className=" text-foreground">Show date</FormLabel>
                <FormDescription className="text-muted-foreground">
                  Show the start and end dates in the announcement.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-items-end items-end justify-end pt-2">
          <Button type="submit">Schedule</Button>
        </div>
        </form>
    </Form>
  );
}
