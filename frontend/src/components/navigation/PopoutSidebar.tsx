import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import MenuIcon from "../assets/MenuIcon"
import { Sidebar } from "./Sidebar"

export default function PopoutSidebar() {
    return (
        <Sheet>
            <SheetTrigger><MenuIcon /></SheetTrigger>
            <SheetContent side="left">
                <SheetHeader >
                    <SheetTitle></SheetTitle>
                    <SheetDescription className="w-100">
                        <Sidebar isPopout={true} />
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}