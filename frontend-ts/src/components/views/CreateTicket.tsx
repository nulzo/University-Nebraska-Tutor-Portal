import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Header from "../typography/Header";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Toast, ToastAction } from "../ui/toast";
import { Toaster } from "../ui/toaster";
import Quill from "@/components/typography/Quill";

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "Please enter a first name.",
  }),
  lastname: z.string().min(2, {
    message: "Please enter a last name.",
  }),
  email: z.string().min(2, {
    message: "Please enter an email.",
  }),
  nuid: z.string().min(2, {
    message: "Please enter a valid NUID.",
  }),
  year: z.string().min(2, {
    message: "Please select a grade level.",
  }),
  degree: z.string().min(2, {
    message: "Please enter a degree program.",
  }),
  course: z.string({
    required_error: "Please select the course.",
  }),
});

const courses = [
  { label: "Data Structures", value: "ds" },
  { label: "Discrete Math", value: "dm" },
  { label: "Algorithms", value: "alg" },
  { label: "Computer Architecture", value: "ca" },
  { label: "Database Systems", value: "db" },
  { label: "Operating Systems", value: "os" },
  { label: "Software Engineering", value: "se" },
  { label: "Artificial Intelligence", value: "ai" },
  { label: "Web Development", value: "wd" },
  { label: "Network Security", value: "ns" },
] as const;

export default function CreateTicket() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      nuid: "",
      degree: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: (
        <span className="text-green-700">Successfully Submitted Ticket!</span>
      ),
      description: (
        <>
          <span className="font-base">
            Thanks, <span className="font-semibold">{values.firstname}.</span> A
            tutor will be with you shortly.
          </span>
        </>
      ),
      variant: "default",
      className: "border-green-700 shadow-lg",
    });
    return <div></div>;
  }

  const { toast } = useToast();
  return (
    <div>
      <Toaster />
      <Header
        text="Submit a Ticket"
        subtext={
          <>
            <p>
              When submitting your ticket, include your name, email, professor's
              name, course details, and a clear description of the problem or
              question you need assistance with.
            </p>
            Our ticketing system now supports{" "}
            <span className="text-blue-500 italic">syntax highlighting!</span>
          </>
        }
      ></Header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="py-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
            <div className="col-span-2 md:col-span-1">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Nolan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Gregory" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="nolangregory@unomaha.edu"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </div>
          </div>
          <div className="flex flex-wrap grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="nuid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NUID</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Your NUID"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className="text-stone-500"
                            placeholder="Select grade level"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Freshman">Freshman</SelectItem>
                        <SelectItem value="Sophomore">Sophomore</SelectItem>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                        <SelectItem value="Graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1 w-full">
              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input placeholder="Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Course</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "flex justify-between w-full",
                              !field.value &&
                                "text-muted-foreground hover:bg-white",
                            )}
                          >
                            {field.value
                              ? courses.find(
                                  (course) => course.value === field.value,
                                )?.label
                              : "Select Course"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-inherit p-0 overflow-hidden">
                        <Command>
                          <CommandInput placeholder="Search courses..." />
                          <CommandEmpty>No course found.</CommandEmpty>
                          <CommandGroup>
                            {courses.map((course) => (
                              <CommandItem
                                value={course.label}
                                key={course.value}
                                onSelect={() => {
                                  form.setValue("course", course.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    course.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {course.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Professor</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "flex justify-between w-full",
                              !field.value &&
                                "text-muted-foreground hover:bg-white",
                            )}
                          >
                            {field.value
                              ? courses.find(
                                  (course) => course.value === field.value,
                                )?.label
                              : "Select Professor"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-inherit p-0 overflow-hidden">
                        <Command>
                          <CommandInput placeholder="Search professors..." />
                          <CommandEmpty>No professor found.</CommandEmpty>
                          <CommandGroup>
                            {courses.map((course) => (
                              <CommandItem
                                value={course.label}
                                key={course.value}
                                onSelect={() => {
                                  form.setValue("course", course.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    course.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {course.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modality</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className="text-stone-500"
                            placeholder="Select modality"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="InPerson">In-Person</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <Quill />
          </div>
          <div className="flex justify-end">
            <Button variant="outline">Submit Ticket</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
