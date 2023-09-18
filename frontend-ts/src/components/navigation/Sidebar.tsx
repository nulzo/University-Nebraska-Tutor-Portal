import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ProfileIcon from "../assets/ProfileIcon"
import DashboardIcon from "../assets/DashboardIcon"
import TutorsIcon from "../assets/TutorsIcon"
import CreateIcon from "../assets/CreateIcon"
import ViewIcon from "../assets/ViewIcon"
import EditIcon from "../assets/EditIcon"
import MessageIcon from "../assets/MessageIcon"
import SettingsIcon from "../assets/SettingsIcon"
import ZoomIcon from "../assets/ZoomIcon"
import CalendarIcon from "../assets/CalendarIcon"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@radix-ui/themes"



interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {

}

export function Sidebar({ className }: SidebarProps) {
    const [isActive, setActive] = useState("Dashboard");

    let navigate = useNavigate();

    const routeChange = (active: string, path: string) => {
        setActive(active);
        navigate(path);
    }

    return (
        <div className="hidden lg:flex">
            <aside className="h-screen sticky top-0">
                <div className={cn("pb-12", className)}>
                    <div className="space-y-4">
                        {/* <div className="flex flex-wrap bg-gray-50 py-4 pb-2 text-center justify-center border-b mb-2">
                            <UNOIcon />
                            <div className="basis-full" />
                            <span className={"px-2 py-2 flex flex-wrap hidden lg:flex content-center text-sm font-semibold tracking-tight"}>Computer Science Learning Center</span>
                        </div> */}
                        <ScrollArea size="1" style={{  height: "90vh" }} className="h-full py-4" type="auto" scrollbars="vertical">
                            <div>
                                <div className="px-3 py-2 space-y-1">
                                    <h2 className={"mb-2 px-4 text-lg font-semibold tracking-tight"}>
                                        General
                                    </h2>
                                    <Button variant={`${isActive === "Dashboard" ? 'secondary' : 'ghost'}`} className="w-full justify-start hover:text-red-900" onClick={() => routeChange("Dashboard", "/dashboard")}>
                                        <DashboardIcon />
                                        <span className="p-2">Dashboard</span>
                                    </Button>
                                    <Button variant={`${isActive === "Tutors" ? 'secondary' : 'ghost'}`} className="w-full justify-start hover:text-red-900" onClick={() => routeChange("Tutors", "/tutors")}>
                                        <TutorsIcon />
                                        <span className="p-2">Tutors</span>
                                    </Button>
                                    <Button variant={`${isActive === "Zoom" ? 'secondary' : 'ghost'}`} className="w-full justify-start hover:text-red-900" onClick={() => routeChange("Zoom", "/zoom")}>
                                        <ZoomIcon />
                                        <span className="p-2">CSLC Zoom</span>
                                    </Button>
                                    <Button variant={`${isActive === "Hours" ? 'secondary' : 'ghost'}`} className="w-full justify-start hover:text-red-900" onClick={() => routeChange("Hours", "/hours")}>
                                        <CalendarIcon />
                                        <span className="p-2">CSLC Hours</span>
                                    </Button>
                                </div>
                                <div className="px-3 py-2">
                                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                        Tickets
                                    </h2>
                                    <div className="space-y-1">
                                        <Button variant={`${isActive === "Create" ? 'secondary' : 'ghost'}`} className="w-full justify-start hover:text-red-900" onClick={() => routeChange("Create", "/tickets/create")}>
                                            <CreateIcon />
                                            <span className="p-2">Create Ticket</span>
                                        </Button>
                                        <Button variant={`${isActive === "View" ? 'secondary' : 'ghost'}`} className="w-full justify-start hover:text-red-900" onClick={() => routeChange("View", "/tickets/view")}>
                                            <ViewIcon />
                                            <span className="p-2">View Tickets</span>
                                        </Button>
                                        <Button variant={`${isActive === "Edit" ? 'secondary' : 'ghost'}`} className="w-full justify-start hover:text-red-900" onClick={() => routeChange("Edit", "/tickets/edit")}>
                                            <EditIcon />
                                            <span className="p-2">Edit Tickets</span>
                                        </Button>
                                    </div>
                                </div>
                                
                                <div className="px-3 py-2">
                                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                        Account
                                    </h2>
                                    <div className="space-y-1">
                                        <Button variant={`${isActive === "Profile" ? 'secondary' : 'ghost'}`} className="w-full justify-start hover:text-red-900" onClick={() => routeChange("Profile", "/user/profile")}>
                                            <ProfileIcon />
                                            <span className="p-2">Profile</span>
                                        </Button>
                                        <Button variant={`${isActive === "Messages" ? 'secondary' : 'ghost'}`} className="w-full justify-start hover:text-red-900" onClick={() => routeChange("Messages", "/user/messages")}>
                                            <MessageIcon />
                                            <span className="p-2">Messages</span>
                                        </Button>
                                        <Button variant={`${isActive === "Settings" ? 'secondary' : 'ghost'}`} className="w-full justify-start hover:text-red-900" onClick={() => routeChange("Settings", "/user/settings")}>
                                            <SettingsIcon />
                                            <span className="p-2">Settings</span>
                                        </Button>
                                    </div>
                                </div>
                               
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </aside>
        </div>
    )
}