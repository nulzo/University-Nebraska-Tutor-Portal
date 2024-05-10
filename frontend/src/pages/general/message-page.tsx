import Header from "@/components/typography/Header.tsx";
import { Separator } from "@/components/ui/separator.tsx";

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
