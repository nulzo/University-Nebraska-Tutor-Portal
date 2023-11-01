import Header from "@/components/typography/Header";
import { Separator } from "@/components/ui/separator";

export default function HoursView() {
  return (
    <>
      <Header
        text="Hours of Operation"
        subtext={
          <>
            See what hours the tutoring center are open, and see if any
            schedling changes have occured.
          </>
        }
      />
      <Separator className="mb-4" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-grain"
        width={128}
        height={128}
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="#86daeb"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M7 4v16l13 -8z"></path>
      </svg>
    </>
  );
}
