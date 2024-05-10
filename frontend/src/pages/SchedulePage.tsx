import useFetchTutor from "@/API/tutors/useFetchTutor";
import Avatar from "@/components/display/Avatar";
import Header from "@/components/typography/Header";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";

export default function SchedulePage() {
  const tutors = useFetchTutor();
  if (tutors) console.log(tutors);
  return (
    <>
      <Header text="Tutor Schedules" subtext="View your schedule." />
      <Separator />
      <div className="grid grid-cols-8 min-h-screen">
        <div className="col-span-2 border-r">
          <div className="hidden xl:flex justify-center mt-4">
            <Calendar mode="single" initialFocus className="text-primary" />
          </div>
          <Separator className="my-4 hidden xl:block" />
          <div className="text-lg font-bold text-primary mb-4 mt-4 xl:mt-0">
            Select Tutor
          </div>
          <div className="space-y-4">
            {!tutors?.isLoading &&
              tutors?.data.map((tutor: any) => (
                <div>
                  <Button variant="tutor" className="text-primary space-x-2">
                    <Avatar name={tutor.name[0]} />
                    <div className="underline-offset-4 hover:underline">
                      {tutor.name}
                    </div>
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
