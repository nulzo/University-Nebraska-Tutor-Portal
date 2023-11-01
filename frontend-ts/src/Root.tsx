import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/navigation/Sidebar";
import Navbar from "./components/navigation/Navbar";
import { Toaster } from "./components/ui/toaster";
import { useEffect } from "react";

export default function Root() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.getElementById("root")?.classList.add("theme", theme);
    }
  }, []);
  return (
    <>
      <div className="">
        <Navbar />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-14 3xl:grid-cols-14">
              <Sidebar />
              <div className="col-span-3 sm:col-span-4 md:col-span-6 lg:col-span-6 xl:col-span-8 lg:border-l sm:border-muted-primary 3xl:col-span-9">
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
