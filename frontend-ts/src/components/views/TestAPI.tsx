import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import Header from "../typography/Header"
import { Toaster } from "../ui/toaster"
import axios from "axios";
import { Checkbox } from "../ui/checkbox"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem, SelectGroup } from "../ui/select"

const courses = [
    "Introduction to Computer Science",
    "Data Structures and Algorithms",
    "Machine Learning Fundamentals",
    "Web Development Bootcamp",
    "Computer Networks and Security",
    "Operating Systems",
    "Databases and SQL",
    "Artificial Intelligence",
    "Software Engineering",
    "Data Science and Big Data Analytics",
    "Computer Graphics",
    "Computer Vision",
    "Natural Language Processing",
    "Cybersecurity",
    "Algorithms and Data Structures in C++",
    "Game Development",
    "Blockchain and Cryptocurrency",
    "Cloud Computing",
    "Robotics",
    "Internet of Things (IoT)",
]

const issue = [
    "Homework",
    "Exam Prep",
    "Confused",
    "Other"
]

const formSchema = z.object({
    claimed: z.boolean().default(false),
    closed: z.boolean().default(false),
    description: z.string().min(2, {
        message: "Please enter a first name.",
    }),
    issuetype: z.string().min(2, {
        message: "Please enter a first name.",
    }),
    professor: z.string().min(2, {
        message: "Please enter a first name.",
    }),
    course: z.string().min(2, {
        message: "Please enter a first name.",
    }),
    name: z.string().min(2, {
        message: "Please enter a first name.",
    }),
    assignment: z.string().min(2, {
        message: "Please enter a first name.",
    }),
})

export default function TestAPI() {

    const [professors, setProfessors] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getProfessors()
    }, [])

    const getProfessors = (): void => {
        axios.get("http://localhost:8000/api/professor/")
            .then((res) => { setProfessors(res) })
            .catch((error) => { console.log(error) })
            .finally(() => setLoading(false));
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            claimed: false,
            issuetype: "Homework",
            description: "",
            professor: "Dulce Bechtelar",
            course: "Operating Systems",
            assignment: "",
            name: ""
        },
    })

    let navigate = useNavigate();

    const routeChange = (path: string) => {
        navigate(path);
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        axios.post('http://localhost:8000/api/tasks/',
            {
                'claimed': values.claimed,
                'issue_type': values.issuetype,
                'description': values.description,
                'professor': values.professor,
                'closed': values.closed,
                'course': values.course,
                'assignment': values.assignment,
                'name': values.name
            })
            .then(function (response) { console.log(response) })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });

        routeChange("/tickets/view");
        toast({
            title: <span className="text-green-700">Successfully Submitted Ticket!</span>,
            description: <><span className="font-base">Thanks, <span className="font-semibold">{values.name}.</span> A tutor will be with you shortly.</span></>,
            variant: "default",
            className: "border-green-700 shadow-lg"
        });

        setTimeout(() => {

        }, 500);



        return (
            <div></div>
        )
    }

    const { toast } = useToast()

    if (isLoading) {
        return (
            <h1>Hello</h1>
        )
    }
    else {
        let prof = professors.data
        let profArray = []
        for (let i = 0; i < 20; i++) {
            profArray.push(prof[i].name)
        }
        console.log(profArray)

        return (
            <div>
                <Toaster />
                <Header text="Submit a Ticket" subtext={<><p>When submitting your ticket, include your name, email, professor's name, course details, and a clear description of the problem or question you need assistance with.</p>Our ticketing system now supports <span className="text-blue-500 italic">syntax highlighting!</span></>}></Header>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="py-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
                            <div className="col-span-2 md:col-span-1">
                                <FormField
                                    control={form.control}
                                    name="claimed"
                                    render={({ field }) => (
                                        <>
                                            <FormLabel>
                                                Select to test the claimed feature
                                            </FormLabel>
                                            <FormItem>
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <FormField
                                    control={form.control}
                                    name="closed"
                                    render={({ field }) => (
                                        <>
                                            <FormLabel>
                                                Select to test the closed feature
                                            </FormLabel>
                                            <FormItem>

                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>

                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your Full Name" {...field} />
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
                                    name="course"
                                    render={({ field }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel>Course</FormLabel>
                                                <Select>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a course" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {courses.map((val) => (
                                                                <SelectItem value={val}>
                                                                    {val}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>

                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <FormField
                                    control={form.control}
                                    name="professor"
                                    render={({ }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel>Professor</FormLabel>
                                                <Select>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a professor" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {profArray.map((val) => (
                                                                <SelectItem value={val}>
                                                                    {val}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>

                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <FormField
                                    control={form.control}
                                    name="assignment"
                                    render={({ field }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel>Assignment</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your Assignment" {...field} />
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
                                    name="issuetype"
                                    render={({ field }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel>Issue Type</FormLabel>
                                                <Select>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select an issue" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {issue.map((val) => (
                                                                <SelectItem value={val}>
                                                                    {val}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>

                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your description..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>

                        </div>
                        <div className="flex justify-end">
                            <Button variant="default">
                                Submit Ticket
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        )
    }
}

