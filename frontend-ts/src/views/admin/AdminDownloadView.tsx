import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import Header from "@/components/typography/Header";

const items = [
    {
        id: "url",
        label: "URL",
    },
    {
        id: "student",
        label: "Student",
    },
    {
        id: "email",
        label: "Email",
    },
    {
        id: "firstname",
        label: "First Name",
    },
    {
        id: "lastname",
        label: "Last Name",
    },
    {
        id: "assignment",
        label: "Assignment",
    },
    {
        id: "question",
        label: "Question",
    },
    {
        id: "problemtype",
        label: "Problem Type",
    },
    {
        id: "status",
        label: "Status",
    },
    {
        id: "timecreated",
        label: "Time Created",
    },
    {
        id: "timeclosed",
        label: "Time Closed",
    },
    {
        id: "success",
        label: "Was Successful",
    },
    {
        id: "primarytutor",
        label: "Primary Tutor",
    },
    {
        id: "assistanttutor",
        label: "Assistant Tutor",
    },
    {
        id: "semester",
        label: "Semester",
    },
    {
        id: "coursenumber",
        label: "Course Number",
    },
    {
        id: "sectionnumber",
        label: "Section Number",
    },
    {
        id: "professor",
        label: "Professor",
    }
] as const

const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    filename: z.string().min(2, {
        message: "File name must be at least 5 characters.",
    }),
    extension: z.string({
        required_error: "Please select an extension.",
    }),
})

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

const getDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}_${month}_${day}`;
    let file = currentDate + "_CSLC_DATA";
    return file;
}

export default function AdminDownloadView() {

    const [filename, setFilename] = useState(getDate);
    const [extension, setExtension] = useState("csv");
    const [professors, setProfessors] = useState({});
    const [sections, setSections] = useState({});
    const [_, setLoading] = useState(true);
    const [toDate, setToDate] = useState<Date>();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    useEffect(() => {
        getProfessors();
    }, []);

    useEffect(() => {
        getSections();
    }, []);

    function getProfessors() {
        axios
            .get("http://localhost:6969/api/professors/")
            .then((res) => {
                setProfessors(res);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => { setLoading(false) });
    };

    function getSections() {
        axios.get("http://localhost:6969/api/sections/")
            .then((res) => {
                setSections(res)
            })
            .catch((error) => {
                console.log(error)
            })
    };



    let default_array = [];

    for (let item in items) {
        default_array.push(items[item].id);
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            items: default_array,
            filename: filename,
            extension: extension
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(professors);
        console.log(sections);
        console.log(data)
    }

    return (
        <>
            <Header text="Download Tutoring Portal History" subtext="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
            <Tabs defaultValue="download" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="download">Download</TabsTrigger>
                    <TabsTrigger value="query">
                        Custom Query
                    </TabsTrigger>
                    <TabsTrigger value="single">
                        By Entity
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="download" className="space-y-4">
                    <Card>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="items"
                                    render={() => (
                                        <>
                                            <FormItem>
                                                <div className="mb-4">
                                                    <CardHeader>
                                                        <FormLabel className="text-base">Download Data</FormLabel>
                                                        <FormDescription>
                                                            Select the items you want to include in your csv file (header goes top to bottom as left to right).
                                                        </FormDescription>
                                                    </CardHeader>
                                                </div>
                                                <CardContent>
                                                    {items.map((item) => (
                                                        <FormField
                                                            key={item.id}
                                                            control={form.control}
                                                            name="items"
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={item.id}
                                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(item.id)}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                        ? field.onChange([...field.value, item.id])
                                                                                        : field.onChange(
                                                                                            field.value?.filter(
                                                                                                (value) => value !== item.id
                                                                                            )
                                                                                        )
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="text-sm font-normal">
                                                                            {item.label}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    ))}
                                                    <FormMessage />
                                                </CardContent>

                                                <div className="flex content-center pt-5 pl-5 pb-2">
                                                    <div className="col-span-3 items-center content-center">
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input placeholder="Enter your date" className="rounded-none rounded-l-lg" onChange={(event) => { setFilename(event.target.value); form.setValue("filename", event.target.value) }} value={filename} />
                                                            </FormControl>
                                                            <FormDescription>
                                                                This is the name that the file will be downloaded to.
                                                            </FormDescription>
                                                        </FormItem>
                                                    </div>
                                                    <div className="flex flex-wrap col-span-1 content-start items-center ">
                                                        <FormItem>
                                                            <Select onValueChange={(event) => { setExtension(event); form.setValue("extension", event) }}>
                                                                <SelectTrigger className="w-fit rounded-none border-l-0 rounded-r-lg">
                                                                    <SelectValue placeholder=".csv" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="csv">.csv</SelectItem>
                                                                        <SelectItem value="xlsx">.xslx</SelectItem>
                                                                        <SelectItem value="xml">.xml</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormItem>
                                                    </div>
                                                </div>
                                                <Button type="submit" className="ml-5 mt-5">Download Data</Button>
                                            </FormItem>
                                        </>
                                    )}

                                />

                            </form>
                        </Form >
                        <CardFooter />
                    </Card>
                </TabsContent>
                <TabsContent value="query" className="space-y-4">
                    <Card>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="items"
                                    render={() => (
                                        <>
                                            <FormItem>
                                                <div className="mb-4">
                                                    <CardHeader>
                                                        <FormLabel className="text-base">Download Via Custom Query</FormLabel>
                                                        <FormDescription>
                                                            Write your own code to query the db (resonsably).
                                                        </FormDescription>
                                                    </CardHeader>
                                                </div>
                                                <CardContent className="space-y-6">
                                                    <div className="grid grid-cols-6 space-y-6">
                                                        <div className="flex flex-wrap font-semibold content-center pr-10 col-span-1">
                                                            Professor:
                                                        </div>
                                                        <div className="col-span-5">
                                                            <Popover open={open} onOpenChange={setOpen}>
                                                                <PopoverTrigger asChild className="col-span-5">
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        aria-expanded={open}
                                                                        className="w-[200px] justify-between"
                                                                    >
                                                                        {value
                                                                            ? frameworks.find((framework) => framework.value === value)?.label
                                                                            : "Select Professor..."}
                                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[200px] p-0">
                                                                    <Command>
                                                                        <Command placeholder="Search framework..." className="h-9" />
                                                                        <CommandEmpty>No framework found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            {frameworks.map((framework) => (
                                                                                <CommandItem
                                                                                    key={framework.value}
                                                                                    onSelect={(currentValue) => {
                                                                                        setValue(currentValue === value ? "" : currentValue)
                                                                                        setOpen(false)
                                                                                    }}
                                                                                >
                                                                                    {framework.label}
                                                                                    <CheckIcon
                                                                                        className={cn(
                                                                                            "ml-auto h-4 w-4",
                                                                                            value === framework.value ? "opacity-100" : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        <div className="flex flex-wrap font-semibold content-center pr-10 col-span-1">
                                                            Section:
                                                        </div>
                                                        <div className="col-span-5">
                                                            <Popover open={open} onOpenChange={setOpen}>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        aria-expanded={open}
                                                                        className="w-[200px] justify-between"
                                                                    >
                                                                        {value
                                                                            ? frameworks.find((framework) => framework.value === value)?.label
                                                                            : "Select Section..."}
                                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[200px] p-0">
                                                                    <Command>
                                                                        <Command placeholder="Search framework..." className="h-9" />
                                                                        <CommandEmpty>No framework found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            {frameworks.map((framework) => (
                                                                                <CommandItem
                                                                                    key={framework.value}
                                                                                    onSelect={(currentValue) => {
                                                                                        setValue(currentValue === value ? "" : currentValue)
                                                                                        setOpen(false)
                                                                                    }}
                                                                                >
                                                                                    {framework.label}
                                                                                    <CheckIcon
                                                                                        className={cn(
                                                                                            "ml-auto h-4 w-4",
                                                                                            value === framework.value ? "opacity-100" : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>


                                                        <div className="flex flex-wrap font-semibold content-center pr-10 col-span-1">
                                                            Course:
                                                        </div>
                                                        <div className="col-span-5">
                                                            <Popover open={open} onOpenChange={setOpen}>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        aria-expanded={open}
                                                                        className="w-[200px] justify-between"
                                                                    >
                                                                        {value
                                                                            ? frameworks.find((framework) => framework.value === value)?.label
                                                                            : "Select Course..."}
                                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[200px] p-0">
                                                                    <Command>
                                                                        <Command placeholder="Search framework..." className="h-9" />
                                                                        <CommandEmpty>No framework found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            {frameworks.map((framework) => (
                                                                                <CommandItem
                                                                                    key={framework.value}
                                                                                    onSelect={(currentValue) => {
                                                                                        setValue(currentValue === value ? "" : currentValue)
                                                                                        setOpen(false)
                                                                                    }}
                                                                                >
                                                                                    {framework.label}
                                                                                    <CheckIcon
                                                                                        className={cn(
                                                                                            "ml-auto h-4 w-4",
                                                                                            value === framework.value ? "opacity-100" : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        <div className="flex flex-wrap font-semibold content-center pr-10 col-span-1">
                                                            Semester:
                                                        </div>
                                                        <div className="col-span-5">
                                                            <Popover open={open} onOpenChange={setOpen}>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        aria-expanded={open}
                                                                        className="w-[200px] justify-between"
                                                                    >
                                                                        {value
                                                                            ? frameworks.find((framework) => framework.value === value)?.label
                                                                            : "Select Semester..."}
                                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[200px] p-0">
                                                                    <Command>
                                                                        <Command placeholder="Search framework..." className="h-9" />
                                                                        <CommandEmpty>No framework found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            {frameworks.map((framework) => (
                                                                                <CommandItem
                                                                                    key={framework.value}
                                                                                    onSelect={(currentValue) => {
                                                                                        setValue(currentValue === value ? "" : currentValue)
                                                                                        setOpen(false)
                                                                                    }}
                                                                                >
                                                                                    {framework.label}
                                                                                    <CheckIcon
                                                                                        className={cn(
                                                                                            "ml-auto h-4 w-4",
                                                                                            value === framework.value ? "opacity-100" : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        <div className="flex flex-wrap font-semibold content-center pr-10 col-span-1">
                                                            Student:
                                                        </div>
                                                        <div className="col-span-5">
                                                            <Popover open={open} onOpenChange={setOpen}>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        aria-expanded={open}
                                                                        className="w-[200px] justify-between"
                                                                    >
                                                                        {value
                                                                            ? frameworks.find((framework) => framework.value === value)?.label
                                                                            : "Select Student..."}
                                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[200px] p-0">
                                                                    <Command>
                                                                        <Command placeholder="Search framework..." className="h-9" />
                                                                        <CommandEmpty>No framework found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            {frameworks.map((framework) => (
                                                                                <CommandItem
                                                                                    key={framework.value}
                                                                                    onSelect={(currentValue) => {
                                                                                        setValue(currentValue === value ? "" : currentValue)
                                                                                        setOpen(false)
                                                                                    }}
                                                                                >
                                                                                    {framework.label}
                                                                                    <CheckIcon
                                                                                        className={cn(
                                                                                            "ml-auto h-4 w-4",
                                                                                            value === framework.value ? "opacity-100" : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        <div className="flex flex-wrap font-semibold content-center pr-10 col-span-1">
                                                            Tutor:
                                                        </div>
                                                        <div className="col-span-5">
                                                            <Popover open={open} onOpenChange={setOpen}>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        aria-expanded={open}
                                                                        className="w-[200px] justify-between"
                                                                    >
                                                                        {value
                                                                            ? frameworks.find((framework) => framework.value === value)?.label
                                                                            : "Select Tutor..."}
                                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[200px] p-0">
                                                                    <Command>
                                                                        <Command placeholder="Search framework..." className="h-9" />
                                                                        <CommandEmpty>No framework found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            {frameworks.map((framework) => (
                                                                                <CommandItem
                                                                                    key={framework.value}
                                                                                    onSelect={(currentValue) => {
                                                                                        setValue(currentValue === value ? "" : currentValue)
                                                                                        setOpen(false)
                                                                                    }}
                                                                                >
                                                                                    {framework.label}
                                                                                    <CheckIcon
                                                                                        className={cn(
                                                                                            "ml-auto h-4 w-4",
                                                                                            value === framework.value ? "opacity-100" : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        <div className="flex flex-wrap font-semibold content-center pr-10 col-span-1">
                                                            Issue Type:
                                                        </div>
                                                        <div className="col-span-5">
                                                            <Popover open={open} onOpenChange={setOpen}>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        aria-expanded={open}
                                                                        className="w-[200px] justify-between"
                                                                    >
                                                                        {value
                                                                            ? frameworks.find((framework) => framework.value === value)?.label
                                                                            : "Select Issue..."}
                                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[200px] p-0">
                                                                    <Command>
                                                                        <Command placeholder="Search framework..." className="h-9" />
                                                                        <CommandEmpty>No framework found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            {frameworks.map((framework) => (
                                                                                <CommandItem
                                                                                    key={framework.value}
                                                                                    onSelect={(currentValue) => {
                                                                                        setValue(currentValue === value ? "" : currentValue)
                                                                                        setOpen(false)
                                                                                    }}
                                                                                >
                                                                                    {framework.label}
                                                                                    <CheckIcon
                                                                                        className={cn(
                                                                                            "ml-auto h-4 w-4",
                                                                                            value === framework.value ? "opacity-100" : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        <div className="flex flex-wrap font-semibold content-center pr-10 col-span-1">
                                                            Modality:
                                                        </div>
                                                        <div className="col-span-5">
                                                            <Popover open={open} onOpenChange={setOpen}>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        aria-expanded={open}
                                                                        className="w-[200px] justify-between"
                                                                    >
                                                                        {value
                                                                            ? frameworks.find((framework) => framework.value === value)?.label
                                                                            : "Select Modality..."}
                                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[200px] p-0">
                                                                    <Command>
                                                                        <Command placeholder="Search framework..." className="h-9" />
                                                                        <CommandEmpty>No framework found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            {frameworks.map((framework) => (
                                                                                <CommandItem
                                                                                    key={framework.value}
                                                                                    onSelect={(currentValue) => {
                                                                                        setValue(currentValue === value ? "" : currentValue)
                                                                                        setOpen(false)
                                                                                    }}
                                                                                >
                                                                                    {framework.label}
                                                                                    <CheckIcon
                                                                                        className={cn(
                                                                                            "ml-auto h-4 w-4",
                                                                                            value === framework.value ? "opacity-100" : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        <div className="flex flex-wrap font-semibold content-center pr-10 col-span-1">
                                                            Date Range:
                                                        </div>
                                                        <div className="flex col-span-5">
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "justify-start text-left font-normal",
                                                                            !toDate && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                                        {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={toDate}
                                                                        onSelect={setToDate}
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                            <p className="flex content-center flex-wrap px-4 text-gray-400 font-thin">
                                                                to
                                                            </p>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "justify-start text-left font-normal",
                                                                            !toDate && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                                        {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={toDate}
                                                                        onSelect={setToDate}
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                    </div>
                                                </CardContent>


                                                <div className="flex content-center pt-5 pl-5 pb-2">
                                                    <div className="col-span-3 items-center content-center">
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input placeholder="Enter your date" className="rounded-none rounded-l-lg" onChange={(event) => { setFilename(event.target.value); form.setValue("filename", event.target.value) }} value={filename} />
                                                            </FormControl>
                                                            <FormDescription>
                                                                This is the name that the file will be downloaded to.
                                                            </FormDescription>
                                                        </FormItem>
                                                    </div>
                                                    <div className="flex flex-wrap col-span-1 content-start items-center ">
                                                        <FormItem>
                                                            <Select onValueChange={(event) => { setExtension(event); form.setValue("extension", event) }}>
                                                                <SelectTrigger className="w-fit rounded-none border-l-0 rounded-r-lg">
                                                                    <SelectValue placeholder=".csv" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="csv">.csv</SelectItem>
                                                                        <SelectItem value="xlsx">.xslx</SelectItem>
                                                                        <SelectItem value="xml">.xml</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormItem>
                                                    </div>
                                                </div>
                                                <Button type="submit" className="ml-5 mt-5">Download Data</Button>
                                            </FormItem>
                                        </>
                                    )}

                                />

                            </form>
                        </Form >
                        <CardFooter />
                    </Card>
                </TabsContent>
                <TabsContent value="single" className="space-y-4">
                    <Card>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="items"
                                    render={() => (
                                        <>
                                            <FormItem>
                                                <div className="mb-4">
                                                    <CardHeader>
                                                        <FormLabel className="text-base">Download Data</FormLabel>
                                                        <FormDescription>
                                                            Select the items you want to include in your csv file (header goes top to bottom as left to right).
                                                        </FormDescription>
                                                    </CardHeader>
                                                </div>
                                                <CardContent>
                                                    {items.map((item) => (
                                                        <FormField
                                                            key={item.id}
                                                            control={form.control}
                                                            name="items"
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={item.id}
                                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(item.id)}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                        ? field.onChange([...field.value, item.id])
                                                                                        : field.onChange(
                                                                                            field.value?.filter(
                                                                                                (value) => value !== item.id
                                                                                            )
                                                                                        )
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="text-sm font-normal">
                                                                            {item.label}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    ))}
                                                    <FormMessage />
                                                </CardContent>

                                                <div className="flex content-center pt-5 pl-5 pb-2">
                                                    <div className="col-span-3 items-center content-center">
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input placeholder="Enter your date" className="rounded-none rounded-l-lg" onChange={(event) => { setFilename(event.target.value); form.setValue("filename", event.target.value) }} value={filename} />
                                                            </FormControl>
                                                            <FormDescription>
                                                                This is the name that the file will be downloaded to.
                                                            </FormDescription>
                                                        </FormItem>
                                                    </div>
                                                    <div className="flex flex-wrap col-span-1 content-start items-center ">
                                                        <FormItem>
                                                            <Select onValueChange={(event) => { setExtension(event); form.setValue("extension", event) }}>
                                                                <SelectTrigger className="w-fit rounded-none border-l-0 rounded-r-lg">
                                                                    <SelectValue placeholder=".csv" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="csv">.csv</SelectItem>
                                                                        <SelectItem value="xlsx">.xslx</SelectItem>
                                                                        <SelectItem value="xml">.xml</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormItem>
                                                    </div>
                                                </div>
                                                <Button type="submit" className="ml-5 mt-5">Download Data</Button>
                                            </FormItem>
                                        </>
                                    )}

                                />

                            </form>
                        </Form >
                        <CardFooter />
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}