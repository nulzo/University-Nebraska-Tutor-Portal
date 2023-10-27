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
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8">
              <Sidebar />
              <div className="col-span-3 lg:col-span-4 lg:border-l sm:border-muted-primary ">
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
