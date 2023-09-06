import React, {Component} from "react";

class Floating extends Component {
    render() {
        return (
            <label
                htmlFor="UserEmail"
                className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
            >
                <input
                    type="email"
                    id="UserEmail"
                    placeholder="Email"
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />

                <span
                    className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                >
    Email
  </span>
            </label>
        )
    }
}

export default Floating
