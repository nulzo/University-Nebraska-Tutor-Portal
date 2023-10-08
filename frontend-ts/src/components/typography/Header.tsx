import { Flex, Heading } from "@radix-ui/themes";
import { Component } from "react";

type PropType = {
  text?: string;
  textcolor?: string;
  textweight?: string;
  subtext?: any;
  subtextcolor?: string;
  subtextweight?: string;
};

const mappings: { [key: string]: any } = {
  bold: "font-bold",
  semibold: "font-semibold",
  regular: "font-base",
  light: "font-light",
  thin: "font-thin",
  heading: "text-2xl",
  subheading: "text-lg",
  extralarge: "text-4xl",
  tight: "tracking-tight",
  wide: "tracking-wide",
  red: "text-red-600",
  black: "text-stone-950",
  white: "text-stone-50",
};

function gets(key: string) {
  return key in mappings ? mappings[key] : "";
}

function c(l: string) {}

console.log(mappings["bold"]);

export default class Header extends Component<PropType> {
  render() {
    return (
      <div className="mt-8 flex text-center pb-6 sm:text-start sm:block justify-center">
        <Flex direction="column" gap="3">
          <Heading size={"8"}>{this.props.text!}</Heading>
          <Heading size={"5"} weight={"light"}>
            <span className="items-center text-gray-500">
              {this.props.subtext!}
            </span>
          </Heading>
        </Flex>
      </div>
    );
  }
}
