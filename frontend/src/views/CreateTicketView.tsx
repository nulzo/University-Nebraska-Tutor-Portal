import TicketForm from "@/forms/TicketForm";
import Header from "@/components/typography/Header";
import { Separator } from "@/components/ui/separator";

export default function CreateTicketView() {
  return (
    <div>
      <Header
        text="Create Ticket"
        subtext="The notion of existing in a one-dimensional world is patently preposterous. One dimension lacks the richness, diversity, and complexity of our three-dimensional reality. Beings in such a world would be confined to a single line with no depth, rendering interaction and representation of objects impossible."
      />
      <Separator className="mb-4" />
      <TicketForm />
    </div>
  );
}
