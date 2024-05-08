import { GithubIcon } from "lucide-react";
import { ModeToggle } from "@/forms/ModeToggle";
import { Button } from "@/components/ui/button";
import UNOIcon from "@/components/assets/UNOIcon";
import { Separator } from "@/components/ui/separator";
import PopoutSidebar from "@/components/navigation/PopoutSidebar";
import CanvasIcon from "@/components/assets/CanvasIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Navbar() {
  return (
    <>
      <div
        className={
          "border-b backdrop-blur bg-background/75 sticky top-0 z-40 flex px-6 lg:px-8 py-2 flex-wrap items-center w-full text-sm"
        }
      >
        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="left-sidebar flex col-span-1">
            <div className="flex flex-wrap justify-items-start content-center">
              <div className="hidden sm:flex items-center">
                <UNOIcon />
                <Separator
                  orientation="vertical"
                  className="hidden lg:block mx-2"
                />
                <div className="hidden lg:block ml-1">
                  <div className="text-sm font-black leading-4">
                    University of Nebraska
                  </div>
                  <div className="text-sm font-base leading-4">
                    Computer Science Learning Center
                  </div>
                </div>
              </div>
              <div className="lg:hidden font-thin text-foreground">
                <Button variant="ghost" className="">
                  <PopoutSidebar />
                </Button>
              </div>
            </div>
          </div>
          <div className="center-sidebar flex justify-center col-span-1 divide-x-[2px] outline-0 divide-gray-200">
            <svg
              id="svg"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0, 0, 400,391"
              className={"mr-1 lg:hidden"}
            >
              <g id="svg">
                <path
                  id="path0"
                  d="M248.000 17.893 C 173.695 22.060,130.572 45.361,116.400 89.000 C 114.727 94.151,72.656 277.733,71.636 284.333 C 67.898 308.519,94.750 323.728,142.667 324.564 C 165.997 324.972,196.000 321.088,196.000 317.662 C 196.000 316.685,195.246 316.634,186.320 317.007 C 134.048 319.190,104.934 302.760,110.111 274.000 C 110.628 271.129,149.156 101.939,150.342 97.333 C 157.630 69.028,191.668 53.138,250.340 50.654 C 307.985 48.214,346.667 68.110,346.667 100.201 C 346.667 105.394,346.665 105.400,321.294 215.801 C 307.731 274.816,296.712 323.303,296.807 323.551 C 297.188 324.544,298.756 323.900,303.225 320.917 C 322.858 307.807,338.410 288.261,344.990 268.427 C 346.578 263.642,380.494 117.214,381.858 109.256 C 391.442 53.346,332.550 13.151,248.000 17.893 M64.833 318.000 C 65.549 318.733,66.210 319.333,66.302 319.333 C 66.394 319.333,65.883 318.733,65.167 318.000 C 64.451 317.267,63.790 316.667,63.698 316.667 C 63.606 316.667,64.117 317.267,64.833 318.000 "
                  stroke="none"
                  fill="#eb242c"
                  fillRule="evenodd"
                ></path>
                <path
                  id="path1"
                  d="M239.000 66.702 C 221.771 67.828,204.000 71.205,204.000 73.352 C 204.000 74.313,204.757 74.365,213.627 74.002 C 262.431 72.005,290.201 85.369,290.156 110.833 L 290.146 116.833 269.885 205.500 C 249.050 296.681,248.941 297.130,246.630 301.758 C 235.964 323.123,209.139 335.381,164.064 339.488 C 99.450 345.374,55.285 326.737,53.438 292.805 C 53.107 286.716,53.131 286.605,78.830 175.236 C 92.455 116.194,103.526 67.687,103.432 67.443 C 103.070 66.501,101.588 67.107,97.291 69.955 C 77.023 83.392,61.744 102.686,54.888 123.500 C 53.652 127.251,19.125 276.269,18.163 282.000 C 9.024 336.471,64.582 376.078,146.241 373.305 C 227.584 370.543,274.585 343.751,285.946 293.667 C 286.507 291.192,296.193 248.736,307.470 199.320 C 331.322 94.793,329.680 103.106,327.845 96.167 C 322.304 75.212,287.147 63.553,239.000 66.702 "
                  stroke="none"
                  fill="#0c0c0c"
                  fillRule="evenodd"
                ></path>
                <path
                  id="path2"
                  d="M254.000 0.199 C 149.752 4.442,57.077 56.339,37.676 121.339 C 36.319 125.886,1.864 274.877,0.908 280.333 C 0.025 285.373,-0.172 301.530,0.596 306.000 C 11.859 371.609,89.438 404.109,191.500 385.976 C 277.553 370.687,346.269 323.860,362.494 269.449 C 363.923 264.659,398.068 116.485,399.046 110.833 C 400.050 105.029,400.292 92.456,399.517 86.367 C 392.605 32.063,333.342 -3.030,254.000 0.199 M277.167 18.007 C 346.819 23.054,390.159 60.829,381.858 109.256 C 380.494 117.214,346.578 263.642,344.990 268.427 C 338.410 288.261,322.858 307.807,303.225 320.917 C 298.756 323.900,297.188 324.544,296.807 323.551 C 296.712 323.303,307.731 274.816,321.294 215.801 C 346.665 105.400,346.667 105.394,346.667 100.201 C 346.667 68.110,307.985 48.214,250.340 50.654 C 191.668 53.138,157.630 69.028,150.342 97.333 C 149.156 101.939,110.628 271.129,110.111 274.000 C 104.934 302.760,134.048 319.190,186.320 317.007 C 195.246 316.634,196.000 316.685,196.000 317.662 C 196.000 321.088,165.997 324.972,142.667 324.564 C 94.750 323.728,67.898 308.519,71.636 284.333 C 72.656 277.733,114.727 94.151,116.400 89.000 C 130.572 45.361,173.695 22.060,248.000 17.893 C 252.746 17.627,273.009 17.706,277.167 18.007 M267.057 66.676 C 310.253 69.577,332.481 84.724,328.189 108.333 C 327.716 110.934,286.543 291.684,285.289 296.667 C 273.241 344.513,226.166 370.508,146.500 373.305 C 64.028 376.201,8.345 336.112,18.293 281.000 C 19.614 273.679,53.734 126.746,54.983 123.000 C 61.080 104.706,74.356 86.891,91.500 73.999 C 99.158 68.240,103.021 66.123,103.512 67.417 C 103.599 67.646,92.498 116.243,78.843 175.411 C 53.282 286.166,53.124 286.891,53.442 292.500 C 55.393 327.000,99.572 345.488,165.354 339.331 C 212.586 334.911,240.394 320.715,248.638 296.815 C 249.592 294.049,289.199 121.126,289.978 116.327 C 294.694 87.261,264.353 71.337,209.586 74.135 C 203.986 74.421,203.276 74.232,204.230 72.705 C 205.237 71.091,222.283 67.956,235.167 67.015 C 237.917 66.814,240.767 66.604,241.500 66.547 C 244.964 66.282,262.506 66.371,267.057 66.676 M237.667 92.504 C 258.425 95.293,267.968 104.724,266.035 120.540 C 265.621 123.928,232.769 268.247,231.633 271.667 C 225.868 289.027,208.088 298.517,180.000 299.228 C 147.067 300.060,131.534 290.353,133.965 270.459 C 134.333 267.448,167.175 122.711,168.219 119.500 C 173.406 103.544,190.247 93.494,214.500 91.880 C 219.155 91.571,233.619 91.960,237.667 92.504 "
                  stroke="none"
                  fill="#fbfbfb"
                  fillRule="evenodd"
                ></path>
              </g>
            </svg>
          </div>
          <div className="flex justify-end space-x-2">
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <a href="https://github.com/nulzo/University-Nebraska-Tutor-Portal">
                        <GithubIcon size={20} />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-background border border-border text-foreground">
                    <p>Source Code</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <ModeToggle />
                </TooltipTrigger>
                <TooltipContent className="bg-background border border-border text-foreground">
                  <p>Color Theme</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <a href="https://unomaha.instructure.com/">
                        <CanvasIcon />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-background border border-border text-foreground">
                    <p>Canvas</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
