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

const formSchema = z.object({
    started: z.boolean().default(false),
    description: z.string().min(2, {
        message: "Please enter a first name.",
    }),
    issuetype: z.string().min(2, {
        message: "Please enter a first name.",
    }),
})

export default function TestAPI() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            started: false,
            issuetype: "",
            description: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("GOT VALUES:", values.started, values.description, values.issuetype);
        axios.post('http://localhost:8000/api/tasks/', { 'started': values.started, 'issue_type': values.issuetype, 'description': values.description })
        .then(function (response) { console.log(response) })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
        console.log(values)
        toast({
            title: <span className="text-green-700">Successfully Submitted Ticket!</span>,
            description: <><span className="font-base">Thanks, <span className="font-semibold">{values.started}.</span> A tutor will be with you shortly.</span></>,
            variant: "default",
            className: "border-green-700 shadow-lg"
        });
        return (
            <div></div>
        )
    }

    const { toast } = useToast()
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
                                name="started"
                                render={({ field }) => (
                                    <>
                                        <FormLabel>
                                            Select this to successfully submit
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
                                name="description"
                                render={({ field }) => (
                                    <>
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your desc..." {...field} />
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
                                            <FormControl>
                                                <Input placeholder="Your issue..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            variant="outline"
                        >
                            Submit Ticket
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}