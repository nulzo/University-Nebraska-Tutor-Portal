import { Component } from "react";

type PropType = {
  text?: string;
  textcolor?: string;
  textweight?: string;
  subtext?: any;
  subtextcolor?: string;
  subtextweight?: string;
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
