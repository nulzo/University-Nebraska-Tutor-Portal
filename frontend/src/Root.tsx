import {Outlet, useLocation} from "react-router-dom";
import Navbar from "@/components/navigation/navbar.tsx";
import { Toaster } from "@/components/ui/toaster";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import {
    AreaChart, Calendar,
    Home, LifeBuoy, LogOut, MessageSquare,
    PenSquare, Settings, User, Users,
} from "lucide-react";
import {NewNav} from "@/components/new-nav.tsx";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {useIssues} from "@/hooks/use-issues.ts";
import {useProfessors} from "@/hooks/use-professors.ts";
import {useTickets} from "@/hooks/use-tickets.ts";
import {useAnnouncements} from "@/hooks/use-announcements.ts";
import {useCourses} from "@/hooks/use-courses.ts";
import {useTutors} from "@/hooks/use-tutors.ts";

export default function Root() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [path, setPath] = useState("");
  const issues = useIssues();
  const professors = useProfessors();
  const location = useLocation();
  const tickets = useTickets();
    const announcements = useAnnouncements();
    const courses = useCourses();
    const tutors = useTutors();
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);
  console.log(issues, professors, tickets, tutors, announcements, courses);

  return (
      <div className="bg-background">
        <Navbar />
        <TooltipProvider delayDuration={0}>
          <ResizablePanelGroup
              direction="horizontal"
              onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                    sizes
                )}`;
              }}
              className="h-full min-h-screen items-stretch"
          >
            <ResizablePanel
                defaultSize={100}
                collapsedSize={3}
                collapsible={true}
                onCollapse={() => (setIsCollapsed(true))}
                onExpand={() => (setIsCollapsed(false))}
                minSize={13}
                maxSize={17}
                className={cn(
                    isCollapsed &&
                    "min-w-[50px] transition-all duration-300 ease-in-out"
                )}
            >
              <NewNav
                  sectionTitle="General Section"
                  isCollapsed={isCollapsed}
                  links={[
                    {
                      title: "Home",
                      label: "128",
                      icon: Home,
                      isActive: path === "/home",
                      isPinging: true,
                      path: "/home"
                    },
                    {
                      title: "Create Ticket",
                      label: "",
                      icon: PenSquare,
                      isActive: path === "/create",
                      isPinging: false,
                      path: "/create"
                    },
                      {
                          title: "CSLC Info",
                          label: "",
                          icon: LifeBuoy,
                          isActive: path === "/info",
                          isPinging: false,
                          path: "/info"
                      }
                  ]}
              />
              <Separator/>
              <NewNav
                  sectionTitle="Tutor Section"
                  isCollapsed={isCollapsed}
                  links={[
                    {
                      title: "Dashboard",
                      label: "1",
                      icon: AreaChart,
                      isActive: path === "/dashboard",
                      isPinging: false,
                      path: "/dashboard"
                    },
                    {
                      title: "Schedule",
                      label: "",
                      icon: Calendar,
                      isActive: path === "/schedule",
                      isPinging: false,
                      path: "/schedule"
                    },
                    {
                      title: "Tutors",
                      label: "",
                      icon: Users,
                      isActive: path === "/tutors",
                      isPinging: false,
                      path: "/tutors"
                    }
                  ]}
              />
              <Separator/>
              <NewNav
                  sectionTitle="Account"
                  isCollapsed={isCollapsed}
                  links={[
                    {
                      title: "Profile",
                      label: "",
                      icon: User,
                      isActive: path === "/profile",
                      isPinging: false,
                      path: "/profile"
                    },
                    {
                      title: "Messages",
                      label: "13",
                      icon: MessageSquare,
                      isActive: path === "/messages",
                      isPinging: false,
                      path: "/messages"
                    },
                    {
                      title: "Settings",
                      label: "",
                      icon: Settings,
                      isActive: path === "/settings",
                      isPinging: false,
                      path: "/settings"
                    },
                    {
                      title: "Logout",
                      label: "",
                      icon: LogOut,
                      isActive: path === "/logout",
                      isPinging: false,
                      path: "/logout"
                    }
                  ]}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              <div className="pt-4">
                 <div className="mx-20 mb-6">
                 <Outlet/>
                 </div>
                 <Toaster/>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </TooltipProvider>
      </div>
  );
}
