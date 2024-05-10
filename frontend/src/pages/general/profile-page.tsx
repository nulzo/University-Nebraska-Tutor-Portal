import LargeAvatar from "@/components/display/large-avatar.tsx";
import Header from "@/components/typography/Header.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";

export default function ProfilePage() {
  return (
    <>
      <Header
        text="Your Profile"
        subtext={<>Edit and modify your profile.</>}
      />
      <Separator className="" />
      <div className="mt-8 text-foreground space-y-8">
        <div className="col-span-2 space-y-4">
          <div className="flex justify-start ml-4 items-center align-center content-center">
            <LargeAvatar name="SN" />
            <div className="pl-4 items-center">
              <div className="text-start font-medium ml-4 mb-2">Icon Color</div>
              <Select>
                <SelectTrigger className="w-[250px] ml-4">
                  <SelectValue placeholder="Select icon color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Colors</SelectLabel>
                    <SelectItem value="yellow">Yellow</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="cyan">Cyan</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="col-span-2 space-y-4">
          <div className="text-start font-medium ml-4">Display Name</div>
          <div className="flex justify-start ml-4 items-center align-center content-center w-[50vw]">
            <Input placeholder="STUDENT_NAME" />
          </div>
        </div>
        <div className="col-span-2 space-y-4">
          <div className="text-start font-medium ml-4">Email</div>
          <div className="flex justify-start ml-4 items-center align-center content-center w-[50vw]">
            <Input disabled placeholder="STUDENT_EMAIL" />
          </div>
        </div>
        <div className="col-span-2 space-y-4">
          <div className="text-start font-medium ml-4">Bio</div>
          <div className="flex justify-start ml-4 items-center align-center content-center w-[50vw]">
            <Textarea
              className="h-[15vh] resize-none"
              placeholder="STUDENT_BIO"
            />
          </div>
        </div>
        <div className="ml-4 space-x-4">
          <Button variant="outline">Discard</Button>
          <Button>Update</Button>
        </div>
      </div>
    </>
  );
}
