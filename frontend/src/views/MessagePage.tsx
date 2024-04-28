import Header from "@/components/typography/Header";
import { Separator } from "@/components/ui/separator";

export default function MessagePage() {
  return (
    <>
      <Header
        text="Messages"
        subtext={<>Just some placeholder stuff for sending messages.</>}
      />
      <Separator className="" />
    </>
  );
}
