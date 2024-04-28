import Header from "@/components/typography/Header";
import { Separator } from "@/components/ui/separator";
import AnnouncementForm from "@/forms/AnnouncementForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {useQuery} from "@tanstack/react-query";
import {fetchData} from "@/API/api.ts";
import {Announcement} from "@/components/display/Announcement.tsx";

export default function AnnouncementPage() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ["announcements"],
    queryFn: () => fetchData("announcements")
  });
  console.log(isError, isLoading, data);
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
            <div className="mt-5">
              <AnnouncementForm />
            </div>
          </TabsContent>
          <TabsContent value="current">
            <Separator className="my-4" />
            {!data?.isLoading && (
                <div className="my-4">
                    {data?.map((announcement: any) => (
                        <Announcement
                            variant="info"
                            title={announcement.title}
                            body={announcement.content}
                            className="my-4"
                        />
                    ))}
                </div>
            )}
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
