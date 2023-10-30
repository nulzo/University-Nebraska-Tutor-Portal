import Header from "@/components/typography/Header";
import { AxeIcon } from "lucide-react";
import { Avatar, Badge, Carousel, Hero, Indicator } from "react-daisyui";

export default function MessageView() {
  return (
    <Carousel display="sequential" snap="center">
      <Carousel.Item children={<Header text="Ethan sucks cock" subtext={"YEP! He really does!"} />} />
      <Carousel.Item>
        <Hero>
          <Indicator className="relative">
            <span className="animate-ping absolute inline-flex h-4 w-4 right-[-1px] top-0 rounded-full bg-green-400 opacity-75 z-10"></span>
            <Badge color="success" size="sm" className="absolute right-[-1px] z-10" />
            <Avatar shape="circle" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </Indicator>
        </Hero>
      </Carousel.Item>
      <Carousel.Item children={<AxeIcon height={100} width={100} color="#fff" />} />
    </Carousel>
  );
}
