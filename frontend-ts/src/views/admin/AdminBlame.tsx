import Header from "@/components/typography/Header";
import { Separator } from "@/components/ui/separator";

export default function AdminBlame() {
  return (
    <>
      <Header
        text="Preen Data"
        subtext={<>Preen through your data to find anything you desire.</>}
      />
      <Separator className="" />
    </>
  );
}
