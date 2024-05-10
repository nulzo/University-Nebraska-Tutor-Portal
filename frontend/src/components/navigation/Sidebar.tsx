import ZoomIcon from "@/components/assets/zoom-icon.tsx";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navlink from "@/components/navigation/Navlink";
import {
  BugIcon,
  CalendarClockIcon,
  CalendarIcon,
  DatabaseZapIcon,
  MessagesSquareIcon,
  PackageOpenIcon,
  TicketIcon,
  UserIcon,
  UsersIcon,
  SettingsIcon,
  HomeIcon,
  MegaphoneIcon,
  DownloadIcon,
  BirdIcon,
  LayoutIcon,
  LogOutIcon,
  LogInIcon,
} from "lucide-react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useQueryClient } from "@tanstack/react-query";

const isAdmin = true;
const isTutor = false;
const isStudent = false;
const isDeveloper = false;

const stroke_width = 1.75;
const shape_rendering = "auto";

export function Sidebar({ isPopout = false }: any) {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [path, setPath] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  function HomeSection() {
    return (
      <div className="px-3 py-2 space-y-1">
        <h2
          className={
            "text-left mb-2  px-4 text-lg font-semibold tracking-tight"
          }
        />
        <Navlink
          className="w-full justify-start"
          isActive={path === "/home"}
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
          isActive={path === "/create"}
          onClick={() => navigate("/create")}
          text="Create Ticket"
          // disabled={!isAuthenticated}
          icon={
            <TicketIcon
              width={20}
              height={20}
              strokeWidth={stroke_width}
              shapeRendering={shape_rendering}
              viewBox={"0 0 24 24"}
            />
          }
        />
      </div>
    );
  }

  function AdminSection() {
    return (
      <div className="px-3 py-2">
        <h2 className="text-left mb-2 px-4 text-lg font-semibold tracking-tight">
          Admin Panel
        </h2>
        <div className="space-y-1">
          <Navlink
            className="w-full justify-start"
            isActive={path === "/admin/dashboard"}
            onClick={() => navigate("/admin/dashboard")}
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
            notification={
              Object(useQueryClient().getQueryData(["new-ticket"])).length !== 0
            }
          />
          <Navlink
            className="w-full justify-start"
            isActive={path === "/admin/download"}
            onClick={() => navigate("/admin/download")}
            text="Data Viewer"
            icon={
              <DatabaseZapIcon
                viewBox="0 0 24 24"
                shapeRendering={shape_rendering}
                width={20}
                height={20}
                strokeWidth={stroke_width}
              />
            }
            notification={false}
          />
          <Navlink
            className="w-full justify-start"
            isActive={path === "/admin/announcements"}
            onClick={() => navigate("/admin/announcements")}
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
            isActive={path === "/admin/blame"}
            onClick={() => navigate("/admin/blame")}
            text="Preen"
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
            isActive={path === "/admin/settings"}
            onClick={() => navigate("/admin/settings")}
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
        <h2
          className={"text-left mb-2 px-4 text-lg font-semibold tracking-tight"}
        >
          General
        </h2>
        <div className="space-y-1">
          <Navlink
            className="w-full justify-start"
            isActive={path === "/zoom"}
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
            isActive={path === "/hours"}
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
        </div>
      </div>
    );
  }

  function TutorSection() {
    return (
      <div className="px-3 py-2 space-y-1">
        <h2
          className={"text-left mb-2 px-4 text-lg font-semibold tracking-tight"}
        >
          Tutor Panel
        </h2>
        <div>
          <Navlink
            className="w-full justify-start"
            isActive={path === "/tutor/dashboard"}
            onClick={() => navigate("/tutor/dashboard")}
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
            notification={
              Object(useQueryClient().getQueryData(["new-ticket"])).length !== 0
            }
          />
        </div>
        <Navlink
          className="w-full justify-start"
          isActive={path === "/tutor/schedule"}
          onClick={() => navigate("/tutor/schedule")}
          text="Schedule"
          icon={
            <CalendarIcon
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
          isActive={path === "/tutor/tutors"}
          onClick={() => navigate("/tutor/tutors")}
          disabled={true}
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
        <h2 className="text-left mb-2 px-4 text-lg font-semibold tracking-tight">
          Account
        </h2>
        <div className="space-y-1">
          <Navlink
            className="w-full justify-start"
            isActive={path === "/profile"}
            onClick={() => navigate("/profile")}
            text="Profile"
            disabled={false}
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
            isActive={path === "/messages"}
            onClick={() => navigate("/messages")}
            text="Messages"
            disabled={false}
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
            isActive={path === "/settings"}
            onClick={() => navigate("/settings")}
            text="Settings"
            disabled={false}
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
          <Navlink
            className="w-full justify-start"
            isActive={path === "/logout"}
            onClick={() => instance.logout()}
            text="Log Out"
            icon={
              <LogOutIcon
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

  function LoginSection() {
    return (
      <div className="px-3 py-2">
        <h2 className="text-left mb-2 px-4 text-lg font-semibold tracking-tight">
          Account
        </h2>
        <div className="space-y-1">
          <Navlink
            className="w-full justify-start"
            isActive={path === "/login"}
            onClick={() => navigate("/login")}
            text="Login"
            icon={
              <LogInIcon
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
        <h2 className="text-left mb-2 px-4 text-lg font-semibold tracking-tight">
          Development Panel
        </h2>
        <div className="space-y-1">
          <Navlink
            className="w-full justify-start"
            isActive={path === "/generate"}
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
            isActive={path === "/test-api"}
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
            isActive={path === "/sandbox"}
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

  if (isPopout) {
    return (
      <div className="flex text-foreground w-full">
        <aside className="h-screen sticky top-0 w-full">
          <div className="block">
            <div className="space-y-8">
              <ScrollArea className=" overflow-y-auto py-0 h-screen">
                <div className="">
                  <HomeSection />
                  {/* If the user is an admin */}
                  {isAdmin && (
                    <>
                      <AdminSection />
                      <GeneralSection />
                    </>
                  )}
                  {/* If the user is a tutor */}
                  {isTutor && (
                    <>
                      <TutorSection />
                      <GeneralSection />
                    </>
                  )}
                  {/* If the user is a student */}
                  {isStudent && <GeneralSection />}
                  {/* If the user is a developer */}
                  {isDeveloper && <DevSettings />}
                  {isAuthenticated && <AccountSettings />}
                  {!isAuthenticated && <LoginSection />}
                </div>
              </ScrollArea>
            </div>
          </div>
        </aside>
      </div>
    );
  }

  return (
    <div className="hidden sticky lg:flex text-foreground lg:col-span-2 xl:col-span-2 3xl:col-span-1">
      <div className="h-screen fixed bg-backgroundsecondary col-span-1 top-10 border-r w-[15rem]">
        <div className="hidden lg:block">
          <div className="space-y-4">
            <ScrollArea className=" overflow-y-auto py-4 h-screen">
              <div className="">
                <HomeSection />
                {/* If the user is an admin */}
                <AdminSection />
                <GeneralSection />
                {/* If the user is a tutor */}
                {/*{isTutor && isAuthenticated && (*/}
                <TutorSection />

                {/*)}*/}
                {/* If the user is a student */}
                <GeneralSection />
                {/* If the user is a developer */}
                 <DevSettings />
                {isAuthenticated && <AccountSettings />}
                {!isAuthenticated && <LoginSection />}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
