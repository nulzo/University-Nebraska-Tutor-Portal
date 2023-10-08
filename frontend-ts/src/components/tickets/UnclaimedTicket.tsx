import { Component } from "react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@radix-ui/themes";

export default class UnclaimedTicket extends Component<any> {
    render() {
        return (
            <>
                <Card className="w-full relative">
                    <CardHeader>
                        <div className="absolute right-5 top-3 m-0 p-0">
                            <Badge color="orange" radius="medium" variant="surface" className="flex justify-end">Unclaimed!</Badge>
                        </div>
                        <CardTitle className="space-y-1 m-0 p-0">
                            <div className="flex">
                                <p className="font-medium">{this.props.course}</p>
                            </div>
                            <div className="flex">
                                <p className="font-medium">{this.props.student}</p>
                            </div>
                        </CardTitle>
                        <CardDescription>
                            <div className="mb-0">
                                <div>
                                    <p>
                                        Professor: {this.props.professor}
                                    </p>
                                    <p>
                                        Assignment: {this.props.assignment}
                                    </p>
                                    <p>
                                        Description: {this.props.description}
                                    </p>
                                </div>
                                <div className="text-xs mt-4 mb-0 text-gray-400">
                                    <div className="justify-start">
                                        Submitted: {this.props.starttime}
                                    </div>
                                    {this.props.editedtime && <div className="italic">Edited: {this.props.editedtime}</div>}
                                </div>

                            </div>
                        </CardDescription>
                    </CardHeader>
                </Card>
            </>
        )
    }
}