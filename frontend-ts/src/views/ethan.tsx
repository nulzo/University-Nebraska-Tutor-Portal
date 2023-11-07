import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    data: z.string({
        required_error: "This field is required"
    })
})

function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
}


export default function ForEthan() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    return (
        <>
            <div className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row px-10 sm:items-center sm:space-y-0 md:h-16">
                <h2 className="text-lg font-semibold">Ethan Awesome API</h2>
            </div>
            <Separator />
            <div className="grid grid-cols-10 h-screen w-screen">
                <div className="col-span-3 border border-t-0 pt-10 pl-10">
                    <Tabs>
                        <TabsList>
                            <TabsTrigger value="summarize">Summarize</TabsTrigger>
                            <TabsTrigger value="extract" disabled>
                                Extract
                            </TabsTrigger>
                            <TabsTrigger value="generate" disabled>
                                Generate
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="summarize" className="space-y-2 mr-10 pt-4">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="data"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Summarize Data
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea className="text-gray-800 h-[20vh] resize-none" placeholder="Enter data here..."
                                                        {...field} />
                                                </FormControl>
                                                <FormDescription>Enter the data you wish to summarize</FormDescription>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="space-x-2 pt-4">
                                        <Button variant={"destructive"} type="reset" onClick={() => (console.log(reset()))}>Clear</Button>
                                        <Button type="submit">Summarize</Button>
                                    </div>
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="w-full col-span-7">
                    <div className="flex items-center content-center align-middle mx-10 my-10">
                        <Textarea disabled className=" flex w-full rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px] resize-none">

                        </Textarea>
                    </div>
                </div>
            </div>
        </>
    )
}