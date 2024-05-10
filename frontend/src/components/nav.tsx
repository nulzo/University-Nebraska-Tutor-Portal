import {LucideIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {useNavigate} from "react-router-dom";
import Notification from "@/components/ui/notification.tsx";

interface NavProps {
    isCollapsed: boolean
    links: {
        title: string
        label?: string
        icon: LucideIcon
        isPinging: boolean
        isActive: boolean
        path: string
    }[]
    sectionTitle: string
}

export function SidebarContent({links, isCollapsed, sectionTitle}: NavProps) {
    const navigate = useNavigate();
    return (
        <div
            data-collapsed={isCollapsed}
            className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
        >
            <nav
                className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {!isCollapsed && <div className=" px-3 font-semibold text-md">
                    {sectionTitle}
                </div>}
                {links.map((link, index) =>
                        isCollapsed ? (
                            <Tooltip key={index} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={() => navigate(link.path)}
                                        key={index}
                                        variant={link.isActive ? "secondary" : "ghost"}
                                        className="text-xs"
                                        size="icon"
                                    >
                                        {link.isPinging && (<Notification/>)}
                                        <link.icon className="h-4 w-4"/>
                                        <span className="sr-only">{link.title}</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="flex items-center gap-4">
                                    {link.title}
                                    {link.label && (
                                        <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                                    )}
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <Button
                                onClick={() => navigate(link.path)}
                                key={index}
                                variant={link.isActive ? "secondary" : "ghost"}
                                className="justify-start text-xs"
                            >
                                {link.isPinging && (
                                    <Notification/>
                                )}
                                <link.icon className="mr-2 h-4 w-4"/>
                                {link.title}
                                {link.label && (
                                    <span
                                        className={cn(
                                            "ml-auto",
                                            link.isActive &&
                                            "text-background dark:text-white"
                                        )}
                                    >
                  {link.label}
                </span>
                                )}
                            </Button>
                        )
                )}
            </nav>
        </div>
    );
}