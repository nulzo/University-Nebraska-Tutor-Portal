import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/navigation/Sidebar";
import Navbar from "./components/navigation/Navbar";
import { Toaster } from "./components/ui/toaster";

export default function Root() {
  return (
    <>
      <div className="">
        <Navbar></Navbar>
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full mx-10 px-4 py-6 lg:px-1">
                  <Outlet />
                </div>
                <Toaster />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}