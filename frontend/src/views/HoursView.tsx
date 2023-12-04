import TutorTicketForm from "@/forms/TutorTicketForm";
import Header from "@/components/typography/Header";
import { Separator } from "@/components/ui/separator";

export default function HoursView() {
  return (
    <>
      <Header
        text="Hours of Operation"
        subtext="See what hours the tutoring center are open, and see if any
            schedling changes have occured."
      />
      <Separator className="mb-4" />
      <TutorTicketForm />
    </>
  );
}
