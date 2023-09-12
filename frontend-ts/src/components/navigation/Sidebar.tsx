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


interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {

}

export function Sidebar({ className }: SidebarProps) {
    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className={"mb-2 px-4 text-lg font-semibold tracking-tight"}>
                        Dashboard
                    </h2>
                    <Button variant="ghost" className="w-full justify-start">
                        <DashboardIcon />
                        <span className="p-2">Dashboard</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <TutorsIcon />
                        <span className="p-2">Tutors</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <ZoomIcon />
                        <span className="p-2">CSLC Zoom</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <CalendarIcon />
                        <span className="p-2">CSLC Hours</span>
                    </Button>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Tickets
                    </h2>
                    <div className="space-y-1">
                        <Button variant="secondary" className="w-full justify-start">
                            <CreateIcon />
                            <span className="p-2">Create Ticket</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <ViewIcon />
                            <span className="p-2">View Tickets</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
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
                        <Button variant="ghost" className="w-full justify-start">
                            <ProfileIcon />
                            <span className="p-2">Profile</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <MessageIcon />
                            <span className="p-2">Messages</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <SettingsIcon />
                            <span className="p-2">Settings</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}