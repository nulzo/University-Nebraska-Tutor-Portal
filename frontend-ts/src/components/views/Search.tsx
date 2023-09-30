import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function Search() {
    return (
        <div>
            <div className="relative  mt-4 rounded-md shadow-sm flex">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm"><MagnifyingGlassIcon height={16} width={16}></MagnifyingGlassIcon></span>
                </div>
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="block bg-white border border-gray-300 w-full rounded-md py-3 pl-10 pr-28 placeholder:text-gray-400 focus:ring-0 focus:border-gray-600 sm:text-sm sm:leading-6 ring-0"
                    placeholder="Search the portal..."
                />
            </div>
            <div className="py-6">
                <div className="font-bold text-lg">
                    Browse All
                </div>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 mt-4">

                    <Card className="w-100 col-span-1">
                        <CardHeader>
                            <CardTitle>Placeholder</CardTitle>
                            <CardDescription>
                                Placeholder
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="italic text-sm text-stone-400 justify-center text-center align-center">
                                <p>
                                    Placeholder...
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-100 col-span-1">
                        <CardHeader>
                            <CardTitle>Placeholder</CardTitle>
                            <CardDescription>
                                Placeholder
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="italic text-sm text-stone-400 justify-center text-center align-center">
                                <p>
                                    Placeholder...
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-100 col-span-1">
                        <CardHeader>
                            <CardTitle>Placeholder</CardTitle>
                            <CardDescription>
                                Placeholder
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="italic text-sm text-stone-400 justify-center text-center align-center">
                                <p>
                                    Placeholder...
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-100 col-span-1">
                        <CardHeader>
                            <CardTitle>Placeholder</CardTitle>
                            <CardDescription>
                                Placeholder
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="italic text-sm text-stone-400 justify-center text-center align-center">
                                <p>
                                    Placeholder...
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-100 col-span-1">
                        <CardHeader>
                            <CardTitle>Placeholder</CardTitle>
                            <CardDescription>
                                Placeholder
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="italic text-sm text-stone-400 justify-center text-center align-center">
                                <p>
                                    Placeholder...
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-100 col-span-1">
                        <CardHeader>
                            <CardTitle>Placeholder</CardTitle>
                            <CardDescription>
                                Placeholder
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="italic text-sm text-stone-400 justify-center text-center align-center">
                                <p>
                                    Placeholder...
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}