import React, {Component} from "react";
import OutlineButton from "../buttons/OutlineButton";
import NavbarButton from "../buttons/NavbarButton";
import NavbarLink from "./NavbarLink";

class Navbar extends Component {
    render() {
        return (
            <header className="bg-white">
                <div
                    className="mx-auto flex h-16 items-center gap-8 px-4 sm:px-6 lg:px-8"
                >
                    <a className="block text-teal-600" href="/">
                        <span className="sr-only">Home</span>
                        <img src={require('../../uno-icon-color.png')} alt={"Logo"} width={48} height={48}/>
                    </a>

                    <div className="flex flex-1 items-center justify-end md:justify-between">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <NavbarLink text={"Home"} href={"/about"}></NavbarLink>
                                </li>
                                <li>
                                    <NavbarLink text={"About"} href={"/about"}></NavbarLink>
                                </li>
                                <li>
                                    <NavbarLink text={"FAQ"} href={"/about"}></NavbarLink>
                                </li>
                            </ul>
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <NavbarButton href={"/login"} text={"Login"}></NavbarButton>
                                <NavbarButton href={"/register"} text={"Register"}></NavbarButton>
                            </div>

                            <button
                                className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                            >
                                <span className="sr-only">Toggle menu</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Navbar
