import React, { Component } from "react";

class Navbar extends Component {
    render() {
        return(
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">CSLC Portal</a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto"/>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={
                        0
                    } className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="public/UNO-logo.ico"/>
                        </div>
                    </label>
                    <ul tabIndex={
                        0
                    } className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
        )
    }
}
export default Navbar
