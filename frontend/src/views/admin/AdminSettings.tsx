import Header from "@/components/typography/Header";
import { CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminSettings() {
  return (
    <div>
      <Header
        text="Admin Settings"
        subtext="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
      <Tabs defaultValue="tutor">
        <TabsList className="w-fit">
          <TabsTrigger value="tutor">Tutors</TabsTrigger>
          <TabsTrigger value="hour">CSLC Hours</TabsTrigger>
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
        <TabsContent value="tutor">
          <Label className="text-base text-foreground">
            Add, Remove, and Modify Tutors
          </Label>
          <CardDescription>
            Change the permissions of tutors, modify tutor hours, and add new
            tutors.
          </CardDescription>
          <Separator className="mb-4 mt-2" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
