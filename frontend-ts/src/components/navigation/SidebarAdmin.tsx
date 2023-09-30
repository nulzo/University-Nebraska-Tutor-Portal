import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ProfileIcon from "../assets/ProfileIcon"
import DashboardIcon from "../assets/DashboardIcon"
import TutorsIcon from "../assets/TutorsIcon"
import SettingsIcon from "../assets/SettingsIcon"
import ZoomIcon from "../assets/ZoomIcon"
import CalendarIcon from "../assets/CalendarIcon"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@radix-ui/themes"
import HomeIcon from "../assets/HomeIcon"
import SearchIcon from "../assets/SearchIcon"
import BlameIcon from "../assets/BlameIcon"
import DownloadIcon from "../assets/DownloadIcon"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import ToolIcon from "../assets/ToolIcon"



interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {

}

export function SidebarAdmin({ className }: SidebarProps) {
    const [isActive, setActive] = useState("Home");

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
                        <ScrollArea size="1" style={{ height: "90vh" }} className="h-full py-4" type="auto" scrollbars="vertical">
                            <div>
                                <div className="px-3 py-2 space-y-1">
                                    <h2 className={"mb-2 px-4 text-lg font-semibold tracking-tight"}>

                                    </h2>
                                    <Button variant={`${isActive === "Home" ? 'secondary' : 'ghost'}`} className="w-full justify-start " onClick={() => routeChange("Home", "/")}>
                                        <HomeIcon />
                                        <span className="p-2">Home</span>
                                    </Button>
                                    <Button variant={`${isActive === "Search" ? 'secondary' : 'ghost'}`} className="w-full justify-start " onClick={() => routeChange("Search", "/search")}>
                                        <SearchIcon />
                                        <span className="p-2">Search</span>
                                    </Button>
                                </div>
                                <div className="px-3 py-2">
                                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight ">
                                        Admin
                                    </h2>
                                    <div className="space-y-1">
                                        <Button variant={`${isActive === "Dashboard" ? 'secondary' : 'ghost'}`} className="w-full justify-start " onClick={() => routeChange("Dashboard", "/dashboard")}>
                                            <DashboardIcon />
                                            <span className="p-2">Admin Panel</span>
                                        </Button>
                                        <Accordion type="single" collapsible className="px-4">
                                            <AccordionItem value="admin-dropdown" className="border-0">
                                                <AccordionTrigger className="">
                                                    <div className="flex">
                                                        <ToolIcon />
                                                        <p className="px-2">Admin Tools</p>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <Button variant={`${isActive === "Settings" ? 'secondary' : 'ghost'}`} className="w-full justify-start " onClick={() => routeChange("Settings", "/user/settings")}>
                                                        <BlameIcon />
                                                        <span className="p-2">Blame</span>
                                                    </Button>
                                                    <Button variant={`${isActive === "Profile" ? 'secondary' : 'ghost'}`} className="w-full justify-start " onClick={() => routeChange("Profile", "/user/profile")}>
                                                        <DownloadIcon />
                                                        <span className="p-2">Download Data</span>
                                                    </Button>
                                                    <Button variant={`${isActive === "Settings" ? 'secondary' : 'ghost'}`} className="w-full justify-start " onClick={() => routeChange("Settings", "/user/settings")}>
                                                        <SettingsIcon />
                                                        <span className="p-2">Update Courses</span>
                                                    </Button>
                                                    <Button variant={`${isActive === "Settings" ? 'secondary' : 'ghost'}`} className="w-full justify-start " onClick={() => routeChange("Settings", "/user/settings")}>
                                                        <SettingsIcon />
                                                        <span className="p-2">Update Professors</span>
                                                    </Button>
                                                    <Button variant={`${isActive === "Settings" ? 'secondary' : 'ghost'}`} className="w-full justify-start " onClick={() => routeChange("Settings", "/user/settings")}>
                                                        <SettingsIcon />
                                                        <span className="p-2">Update Tutors</span>
                                                    </Button>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </div>
                                <div className="px-3 py-2 space-y-1">
                                    <h2 className={"mb-2 px-4 text-lg font-semibold tracking-tight"}>
                                        General
                                    </h2>
                                    <Button variant={`${isActive === "Tutors" ? 'secondary' : 'ghost'}`} className="w-full justify-start " onClick={() => routeChange("Tutors", "/tutors")}>
                                        <TutorsIcon />
                                        <span className="p-2">Tutors</span>
                                    </Button>
                                    <Button variant={`${isActive === "Zoom" ? 'secondary' : 'ghost'}`} className="w-full justify-start " onClick={() => routeChange("Zoom", "/zoom")}>
                                        <ZoomIcon />
                                        <span className="p-2">CSLC Zoom</span>
                                    </Button>
                                    <Button variant={`${isActive === "Hours" ? 'secondary' : 'ghost'}`} className="w-full justify-start " onClick={() => routeChange("Hours", "/hours")}>
                                        <CalendarIcon />
                                        <span className="p-2">CSLC Hours</span>
                                    </Button>
                                </div>
                                <div className="px-3 py-2">
                                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                        Account
                                    </h2>
                                    <div className="space-y-1">
                                        <Button variant={`${isActive === "Profile" ? 'secondary' : 'ghost'}`} className="w-full justify-start " onClick={() => routeChange("Profile", "/user/profile")}>
                                            <ProfileIcon />
                                            <span className="p-2">Profile</span>
                                        </Button>
                                        <Button variant={`${isActive === "Settings" ? 'secondary' : 'ghost'}`} className="w-full justify-start " onClick={() => routeChange("Settings", "/user/settings")}>
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