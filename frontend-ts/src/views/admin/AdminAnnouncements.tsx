import Header from "@/components/typography/Header";
import { Separator } from "@/components/ui/separator";
import AnnouncementForm from "@/components/forms/AnnouncementForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminAnnouncements() {
  return (
    <>
      <div>
        <Header
          text="Announcements"
          subtext="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
        <Tabs defaultValue="create">
          <TabsList className="w-fit">
            <TabsTrigger value="create">New</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <Card className="mt-4">
              <CardContent>
                <div className="mt-5">
                  <AnnouncementForm />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="current">
            <Separator className="my-4" />
          </TabsContent>
          <TabsContent value="past">
            <Separator className="my-4" />
          </TabsContent>
          <TabsContent value="upcoming">
            <Separator className="my-4" />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
