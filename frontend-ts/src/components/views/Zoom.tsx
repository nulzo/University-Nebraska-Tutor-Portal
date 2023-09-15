import { Badge, Link } from "@radix-ui/themes";
import { Divider } from 'react-daisyui'
import { Card, CardContent } from "../ui/card";
import Header from "../typography/Header";

export default function Zoom() {
    function onClick() {
        window.open("https://unomaha.zoom.us/s/94531042940")
    }
    let tutorCount = 0;
    return (
        <>
            <Header
                text="Access Zoom"
                subtext={
                    <>
                        Please click on the button to open Zoom and access online help from our tutors in real-time.<br />
                        Alternatively, you can find a link just below the button that will also connect you to our online tutoring support.<br />
                        We're here to help you succeed!
                    </>
                } />
            <Card className="shadow-lg">
                <CardContent>
                    <p className="pt-4 flex justify-end">
                        {(tutorCount !== 0) ? <Badge color="green">{tutorCount} tutors online</Badge> : <Badge color="red">{tutorCount} tutors online</Badge>}
                    </p>
                    <div>
                        <h3 className="text-xl py-4 text-center font-bold tracking-tight">Open Zoom Client:</h3>
                    </div>
                    <div className="flex flex-wrap justify-center py-2">
                        <button onClick={onClick} className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <div className="px-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-zoom" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M17.011 9.385v5.128l3.989 3.487v-12z" />
                                    <path d="M3.887 6h10.08c1.468 0 3.033 1.203 3.033 2.803v8.196a.991 .991 0 0 1 -.975 1h-10.373c-1.667 0 -2.652 -1.5 -2.652 -3l.01 -8a.882 .882 0 0 1 .208 -.71a.841 .841 0 0 1 .67 -.287z" />
                                </svg>
                            </div>
                            Launch Zoom
                        </button>
                        <br />
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <Link onClick={onClick} color="indigo">
                            https://unomaha.zoom.us/j/94531042940
                        </Link>
                    </div>
                    <div className="flex text-center justify-center ">
                        <Divider className="py-4 w-3/4"> OR </Divider>
                    </div>
                    <div>
                        <h3 className="text-xl pb-2 text-center font-bold tracking-tight">Enter Meeting Code:</h3>
                        <h2 className="text-lg font-semibold tracking-wide text-center text-blue-600">945 3104 2940</h2>
                    </div>

                </CardContent>
            </Card>
        </>

    )
}