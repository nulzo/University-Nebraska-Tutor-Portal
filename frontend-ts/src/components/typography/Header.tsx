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

export default class Header extends Component<PropType> {
  render() {
    return (
      <div className="mt-8 flex text-center pb-6 sm:text-start sm:block justify-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">{this.props.text!}</h1>
          <h2>
            <span className="items-center text-gray-500 font-light">
              {this.props.subtext!}
            </span>
          </h2>
        </div>
      </div>
    );
  }
}
