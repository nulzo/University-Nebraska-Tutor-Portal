import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/typography/Header";
import { Badge } from "@/components/ui/badge";
import ZoomIcon from "@/components/assets/ZoomIcon";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Zoom() {
  function onClick() {
    window.open("https://unomaha.zoom.us/s/94531042940");
  }

  const tutorCount = 0;

  return (
    <>
      <Header
        text="Access Zoom"
        subtext={
          <>
            Please click on the button to open Zoom and access online help from
            our tutors in real-time.
          </>
        }
      />
      <Separator className="mb-4" />
      <Card className="text-foreground">
        <CardContent>
          <p className="pt-4 flex justify-end text-foreground">
            {tutorCount !== 0 ? (
              <Badge color="green" className="text-foreground">
                {tutorCount} tutors online
              </Badge>
            ) : (
              <Badge variant={"warning"} className="text-foreground">
                0 tutors online
              </Badge>
            )}
          </p>
          <div>
            <h3 className="text-xl py-4 text-center font-bold tracking-tight">
              Open Zoom Client:
            </h3>
          </div>
          <div className="flex flex-wrap justify-center py-2">
            <button
              onClick={onClick}
              className="flex bg-zoom hover:bg-[#297EE5] text-white font-bold py-2 px-4 rounded"
            >
              <div className="px-2">
                <ZoomIcon
                  width={24}
                  height={24}
                  viewBox={"0 0 24 24"}
                  strokeWidth={2}
                />
              </div>
              Launch Zoom
            </button>
            <br />
          </div>
          <div className="flex flex-wrap justify-center">
            <Button variant={"link"} className="text-zoom">
              www.google.com
            </Button>
          </div>
          <div className="flex text-center justify-center ">or</div>
          <div>
            <h3 className="text-xl pb-2 text-center font-bold tracking-tight">
              Enter Meeting Code:
            </h3>
            <h2 className="text-lg font-semibold tracking-wide text-center text-blue-600">
              945 3104 2940
            </h2>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
