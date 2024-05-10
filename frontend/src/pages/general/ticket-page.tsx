import TicketForm from "@/forms/ticket-form.tsx";
import Header from "@/components/typography/Header.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Announcement} from "@/components/display/announcement.tsx";
import {useIsAuthenticated} from "@azure/msal-react";

export default function TicketPage() {
    const authenticated = useIsAuthenticated();
    return (
        <div>
            <Header
                text="Create Ticket"
                subtext="The notion of existing in a one-dimensional world is patently preposterous. One dimension lacks the richness, diversity, and complexity of our three-dimensional reality. Beings in such a world would be confined to a single line with no depth, rendering interaction and representation of objects impossible."
            />
            <Separator className="mb-4"/>
            {!authenticated &&
                <div className="pt-2 pb-6">
                    <Announcement className="" variant="alert" title="Heads up!"
                                  body="You can skip typing out your name and email every time you submit a ticket if you login to the app!"></Announcement>
                </div>
            }
            <TicketForm/>
        </div>
    );
}
