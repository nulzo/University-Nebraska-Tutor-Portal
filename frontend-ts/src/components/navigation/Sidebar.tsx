import ZoomIcon from "@/components/assets/ZoomIcon";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navlink from "@/components/navigation/Navlink";
import {
  BugIcon,
  CalendarClockIcon,
  CalendarDaysIcon,
  DatabaseZapIcon,
  MessagesSquareIcon,
  PackageOpenIcon,
  PlusSquareIcon,
  UserIcon,
  UsersIcon,
  SearchIcon,
  SettingsIcon,
  HomeIcon,
  MegaphoneIcon,
  DownloadIcon,
  BirdIcon,
  LayoutIcon,
} from "lucide-react";

const isAdmin = false;
const isTutor = true;
const isStudent = false;
const isDeveloper = true;

const stroke_width = 1.75;
const shape_rendering = "auto";

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
        <Navlink
          className="w-full justify-start"
          isActive={path === "/home" ? true : false}
          onClick={() => navigate("/home")}
          text="Home"
          icon={
            <HomeIcon
              viewBox="0 0 24 24"
              width={20}
              height={20}
              strokeWidth={stroke_width}
              shapeRendering={shape_rendering}
            />
          }
        />
        <Navlink
          className="w-full justify-start"
          isActive={path === "/search" ? true : false}
          onClick={() => navigate("/search")}
          text="Search"
          icon={
            <SearchIcon
              viewBox="0 0 24 24"
              width={20}
              height={20}
              strokeWidth={stroke_width}
              shapeRendering={shape_rendering}
            />
          }
        />
      </div>
    );
  }

  function AdminSection() {
    return (
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Admin Panel
        </h2>
        <div className="space-y-1">
          <Navlink
            className="w-full justify-start"
            isActive={path === "/admin-dashboard" ? true : false}
            onClick={() => navigate("/admin-dashboard")}
            text="Dashboard"
            icon={
              <LayoutIcon
                viewBox="0 0 24 24"
                shapeRendering={shape_rendering}
                width={20}
                height={20}
                strokeWidth={stroke_width}
              />
            }
          />
          <Navlink
            className="w-full justify-start"
            isActive={path === "/announcements" ? true : false}
            onClick={() => navigate("/announcements")}
            text="Announcements"
            icon={
              <MegaphoneIcon
                viewBox="0 0 24 24"
                width={20}
                height={20}
                strokeWidth={stroke_width}
                shapeRendering={shape_rendering}
              />
            }
          />
          <Navlink
            className="w-full justify-start"
            isActive={path === "/download" ? true : false}
            onClick={() => navigate("/download")}
            text="Download Data"
            icon={
              <DownloadIcon
                viewBox="0 0 24 24"
                width={20}
                height={20}
                strokeWidth={stroke_width}
                shapeRendering={shape_rendering}
              />
            }
          />
          <Navlink
            className="w-full justify-start"
            isActive={path === "/blame" ? true : false}
            onClick={() => navigate("/blame")}
            text="Blame"
            icon={
              <BirdIcon
                viewBox="0 0 24 24"
                width={20}
                height={20}
                strokeWidth={stroke_width}
                shapeRendering={shape_rendering}
              />
            }
          />
          <Navlink
            className="w-full justify-start"
            isActive={path === "/admin-settings" ? true : false}
            onClick={() => navigate("/admin-settings")}
            text="Admin Settings"
            icon={
              <SettingsIcon
                viewBox="0 0 24 24"
                width={20}
                height={20}
                strokeWidth={stroke_width}
                shapeRendering={shape_rendering}
              />
            }
          />
        </div>
      </div>
    );
  }

  function GeneralSection() {
    return (
      <div className="px-3 py-2 space-y-1">
        <h2 className={"mb-2 px-4 text-lg font-semibold tracking-tight"}>
          General
        </h2>
        <div className="space-y-1">
          <Navlink
            className="w-full justify-start"
            isActive={path === "/create" ? true : false}
            onClick={() => navigate("/create")}
            text="Create Ticket"
            icon={
              <PlusSquareIcon
                width={20}
                height={20}
                strokeWidth={stroke_width}
                shapeRendering={shape_rendering}
                viewBox={"0 0 24 24"}
              />
            }
          />
          <Navlink
            className="w-full justify-start [&>div>svg]:hover:stroke-zoom"
            isActive={path === "/zoom" ? true : false}
            onClick={() => navigate("/zoom")}
            text="CSLC Zoom"
            icon={
              <ZoomIcon
                width={20}
                height={20}
                viewBox={"0 0 24 24"}
                strokeWidth={stroke_width}
              />
            }
          />
          <Navlink
            className="w-full justify-start"
            isActive={path === "/hours" ? true : false}
            onClick={() => navigate("/hours")}
            text="CSLC Hours"
            icon={
              <CalendarClockIcon
                width={20}
                height={20}
                strokeWidth={stroke_width}
                shapeRendering={shape_rendering}
                viewBox={"0 0 24 24"}
              />
            }
          />
          <Navlink
            className="w-full justify-start"
            isActive={path === "/tutors" ? true : false}
            onClick={() => navigate("/tutors")}
            text="CSLC Tutors"
            icon={
              <UsersIcon
                width={20}
                height={20}
                strokeWidth={stroke_width}
                shapeRendering={shape_rendering}
                viewBox={"0 0 24 24"}
              />
            }
          />
        </div>
      </div>
    );
  }

  function TutorSection() {
    return (
      <div className="px-3 py-2 space-y-1">
        <h2 className={"mb-2 px-4 text-lg font-semibold tracking-tight"}>
          Tutor Panel
        </h2>
        <Navlink
          className="w-full justify-start"
          isActive={path === "/dashboard" ? true : false}
          onClick={() => navigate("/dashboard")}
          text="Dashboard"
          icon={
            <LayoutIcon
              viewBox="0 0 24 24"
              shapeRendering={shape_rendering}
              width={20}
              height={20}
              strokeWidth={stroke_width}
            />
          }
        />
        <Navlink
          className="w-full justify-start"
          isActive={path === "/schedule" ? true : false}
          onClick={() => navigate("/schedule")}
          text="Schedule"
          icon={
            <CalendarDaysIcon
              viewBox="0 0 24 24"
              strokeWidth={stroke_width}
              shapeRendering={shape_rendering}
              width={20}
              height={20}
            />
          }
        />
        <Navlink
          className="w-full justify-start"
          isActive={path === "/tutors" ? true : false}
          onClick={() => navigate("/tutors")}
          text="Tutors"
          icon={
            <UsersIcon
              viewBox="0 0 24 24"
              strokeWidth={stroke_width}
              shapeRendering={shape_rendering}
              width={20}
              height={20}
            />
          }
        />
      </div>
    );
  }

  function AccountSettings() {
    return (
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Account
        </h2>
        <div className="space-y-1">
          <Navlink
            className="w-full justify-start"
            isActive={path === "/profile" ? true : false}
            onClick={() => navigate("/profile")}
            text="Profile"
            icon={
              <UserIcon
                viewBox="0 0 24 24"
                width={20}
                height={20}
                strokeWidth={stroke_width}
                shapeRendering={shape_rendering}
              />
            }
          />
          <Navlink
            className="w-full justify-start"
            isActive={path === "/messages" ? true : false}
            onClick={() => navigate("/messages")}
            text="Messages"
            icon={
              <MessagesSquareIcon
                viewBox="0 0 24 24"
                width={20}
                height={20}
                strokeWidth={stroke_width}
                shapeRendering={shape_rendering}
              />
            }
          />
          <Navlink
            className="w-full justify-start"
            isActive={path === "/settings" ? true : false}
            onClick={() => navigate("/settings")}
            text="Settings"
            icon={
              <SettingsIcon
                viewBox="0 0 24 24"
                width={20}
                height={20}
                strokeWidth={stroke_width}
                shapeRendering={shape_rendering}
              />
            }
          />
        </div>
      </div>
    );
  }

  function DevSettings() {
    return (
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Development Panel
        </h2>
        <div className="space-y-1">
          <Navlink
            className="w-full justify-start"
            isActive={path === "/generate" ? true : false}
            onClick={() => navigate("/generate")}
            text="Generate"
            icon={
              <DatabaseZapIcon
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth={stroke_width}
                shapeRendering={shape_rendering}
              />
            }
          />
          <Navlink
            className="w-full justify-start"
            isActive={path === "/test-api" ? true : false}
            onClick={() => navigate("/test-api")}
            text="Test API"
            icon={
              <BugIcon
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth={stroke_width}
                shapeRendering={shape_rendering}
              />
            }
          />
          <Navlink
            className="w-full justify-start"
            isActive={path === "/sandbox" ? true : false}
            onClick={() => navigate("/sandbox")}
            text="Sandbox"
            icon={
              <PackageOpenIcon
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth={stroke_width}
                shapeRendering={shape_rendering}
              />
            }
          />
        </div>
      </div>
    );
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
            <a href="/" className="text-red-600 underline hover:font-medium">
              here
            </a>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <div className="hidden lg:flex text-foreground xl:col-span-2 lg:col-span-2">
      <aside className="h-screen sticky top-0">
        <div className="hidden lg:block">
          <div className="space-y-4">
            <ScrollArea className=" overflow-y-auto py-4 h-screen">
              <div className="">
                <HomeSection />
                {/* If the user is an admin */}
                {isAdmin && !(isTutor || isStudent) && (
                  <>
                    <AdminSection />
                    <GeneralSection />
                  </>
                )}
                {/* If the user is a tutor */}
                {isTutor && !(isStudent || isAdmin) && (
                  <>
                    <TutorSection />
                    <GeneralSection />
                  </>
                )}
                {/* If the user is a student */}
                {isStudent && !(isTutor || isAdmin) && <GeneralSection />}
                {/* If the user is a developer */}
                {isDeveloper && <DevSettings />}
                <AccountSettings />
              </div>
            </ScrollArea>
          </div>
        </div>
      </aside>
    </div>
  );
}
