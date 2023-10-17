import ProfileIcon from "../assets/ProfileIcon";
import DashboardIcon from "../assets/DashboardIcon";
import TutorsIcon from "../assets/TutorsIcon";
import CreateIcon from "../assets/CreateIcon";
import ViewIcon from "../assets/ViewIcon";
import EditIcon from "../assets/EditIcon";
import MessageIcon from "../assets/MessageIcon";
import SettingsIcon from "../assets/SettingsIcon";
import ZoomIcon from "../assets/ZoomIcon";
import CalendarIcon from "../assets/CalendarIcon";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScrollArea } from "@radix-ui/themes";
import HomeIcon from "../assets/HomeIcon";
import SearchIcon from "../assets/SearchIcon";
import Navlink from "./Navlink";
import BlameIcon from "../assets/BlameIcon";
import SpeakerIcon from "../assets/SpeakerIcon";
import DownloadIcon from "../assets/DownloadIcon";
import ScheduleIcon from "../assets/ScheduleIcon";
import ClockIcon from "../assets/ClockIcon";
import TicketIcon from "../assets/TicketIcon";

const isAdmin = true;
const isTutor = true;
const isStudent = false;

export function Sidebar() {
  const [path, setPath] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  function HomeSection() {
    return (
      <div className="px-3 py-2 space-y-1">
        <h2 className={"mb-2 px-4 text-lg font-semibold tracking-tight"} />
        <Navlink className="w-full justify-start" isActive={path === "/home" ? true : false} onClick={() => navigate("/home")} text="Home" icon={<HomeIcon color="#f8fafc" stroke="1.5" />} />
        <Navlink className="w-full justify-start" isActive={path === "/search" ? true : false} onClick={() => navigate("/search")} text="Search" icon={<SearchIcon color="#f8fafc" stroke="1.5" />} />
      </div>
    )
  }

  function AdminSection() {
    return (
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Admin Panel
        </h2>
        <div className="space-y-1">
          <Navlink className="w-full justify-start" isActive={path === "/blame" ? true : false} onClick={() => navigate("/blame")} text="Blame" icon={<BlameIcon />} />
          <Navlink className="w-full justify-start" isActive={path === "/announcements" ? true : false} onClick={() => navigate("/announcements")} text="Announcement" icon={<SpeakerIcon />} />
          <Navlink className="w-full justify-start" isActive={path === "/admin-settings" ? true : false} onClick={() => navigate("/admin-settings")} text="Admin Settings" icon={<SettingsIcon />} />
          <Navlink className="w-full justify-start" isActive={path === "/download" ? true : false} onClick={() => navigate("/download")} text="Download Data" icon={<DownloadIcon />} />
          <Navlink className="w-full justify-start" isActive={path === "/student-view" ? true : false} onClick={() => navigate("/download")} text="Student View" icon={<ViewIcon />} />
        </div>
      </div>
    )
  }

  function GeneralSection() {
    return (
      <div className="px-3 py-2 space-y-1">
        <h2 className={"mb-2 px-4 text-lg font-semibold tracking-tight"} >
          General
        </h2>
        <div className="space-y-1">
          <Navlink className="w-full justify-start" isActive={path === "/zoom" ? true : false} onClick={() => navigate("/zoom")} text="Join Zoom" icon={<ZoomIcon />} />
          <Navlink className="w-full justify-start" isActive={path === "/hours" ? true : false} onClick={() => navigate("/hours")} text="CSLC Hours" icon={<CalendarIcon />} />
          <Navlink className="w-full justify-start" isActive={path === "/tutors" ? true : false} onClick={() => navigate("/tutors")} text="CSLC Tutors" icon={<TutorsIcon />} />
        </div>
      </div>
    )
  }

  function TutorSection() {
    return (
      <div className="px-3 py-2 space-y-1">
        <h2 className={"mb-2 px-4 text-lg font-semibold tracking-tight"} >
          Tutor Panel
        </h2>
        <Navlink className="w-full justify-start" isActive={path === "/dashboard" ? true : false} onClick={() => navigate("/dashboard")} text="Dashboard" icon={<DashboardIcon />} />
        <Navlink className="w-full justify-start" isActive={path === "/tickets" ? true : false} onClick={() => navigate("/tickets")} text="Tickets" icon={<TicketIcon />} />
        <Navlink className="w-full justify-start" isActive={path === "/schedule" ? true : false} onClick={() => navigate("/schedule")} text="Schedule" icon={<ScheduleIcon />} />
        <Navlink className="w-full justify-start" isActive={path === "/zoom" ? true : false} onClick={() => navigate("/zoom")} text="Zoom" icon={<ZoomIcon />} />
        <Navlink className="w-full justify-start" isActive={path === "/hours" ? true : false} onClick={() => navigate("/hours")} text="Hours" icon={<ClockIcon />} />
      </div>
    )
  }

  function TicketSection() {
    return (
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Tickets
        </h2>
        <div className="space-y-1">
          <Navlink className="w-full justify-start" isActive={path === "/create" ? true : false} onClick={() => navigate("/create")} text="Create Ticket" icon={<CreateIcon />} />
          <Navlink className="w-full justify-start" isActive={path === "/view" ? true : false} onClick={() => navigate("/view")} text="View Tickets" icon={<ViewIcon />} />
          <Navlink className="w-full justify-start" isActive={path === "/edit" ? true : false} onClick={() => navigate("/edit")} text="Edit Tickets" icon={<EditIcon />} />
        </div>
      </div>
    )
  }

  function AccountSettings() {
    return (
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Account
        </h2>
        <div className="space-y-1">
          <Navlink className="w-full justify-start" isActive={path === "/profile" ? true : false} onClick={() => navigate("/profile")} text="Profile" icon={<ProfileIcon />} />
          <Navlink className="w-full justify-start" isActive={path === "/messages" ? true : false} onClick={() => navigate("/messages")} text="Message" icon={<MessageIcon />} />
          <Navlink className="w-full justify-start" isActive={path === "/settings" ? true : false} onClick={() => navigate("/settings")} text="Settings" icon={<SettingsIcon />} />
        </div>
      </div>
    )
  }

  if (!isTutor && !isAdmin && !isStudent) {
    return (
      <aside className="h-screen sticky top-0">
        <div className="text-center text-lg pt-[25vh]">
          <div className="font-light text-foreground">
            <p>You are not</p>
            <p>logged in :(</p>
          </div>
          <div className="font-light text-foreground pt-5">
            <p>Please, log in</p>
            <a href="/" className="text-red-600 underline hover:font-medium">here</a>
          </div>
        </div>
      </aside>
    )
  }

  return (
    <div className="hidden lg:flex text-foreground">
      <aside className="h-screen sticky top-0">
        <div className="hidden lg:block pb-12">
          <div className="space-y-4">
            <ScrollArea
              size="1"
              style={{ height: "90vh" }}
              className="h-full py-4"
              type="auto"
              scrollbars="vertical"
            >
              <div>
                <HomeSection />
                {/* If the user is an admin */}
                {isAdmin && <AdminSection />}
                {/* If the user is a tutor */}
                {isTutor && <TutorSection />}
                {/* If the user is a student */}
                {isStudent && <GeneralSection />}
                {isStudent && <TicketSection />}
                <AccountSettings />
              </div>
            </ScrollArea>
          </div>
        </div >
      </aside >
    </div >
  );
}
