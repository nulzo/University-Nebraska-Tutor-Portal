import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from "axios";

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

const getDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}_${month}_${day}`;
    let file = currentDate + "_CSLC_DATA";
    return file;
}

export default function DownloadView() {

    const [filename, setFilename] = useState(getDate);
    const [extension, setExtension] = useState("csv");
    const [professors, setProfessors] = useState({});
    const [sections, setSections] = useState({});
    const [isLoading, setLoading] = useState(true);

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
        console.log(professors.data);
        console.log(sections.data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                        <>
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Download Data</FormLabel>
                                    <FormDescription>
                                        Select the items you want to include in your csv file (header goes top to bottom as left to right).
                                    </FormDescription>
                                </div>
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
                                <div className="grid grid-cols-8 content-center pt-5">
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
                                    <div className="flex flex-wrap col-span-1 content-start items-center">
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
                            </FormItem>
                        </>
                    )}
                />
                <Button type="submit">Download</Button>
            </form>
        </Form >
    )
}