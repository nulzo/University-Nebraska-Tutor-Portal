import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Navbar from "@/components/navigation/navbar.tsx";
import { Toaster } from "@/components/ui/toaster";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import {
    AppWindow,
    Camera, Clock,
    Home,
    Inbox, PenSquare, Video,
} from "lucide-react";
import {NewNav} from "@/components/new-nav.tsx";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils.ts";

export default function NewSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [path, setPath] = useState("");
    // const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        setPath(location.pathname);
    }, [location]);
    return(
        <></>
    )
}