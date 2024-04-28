import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/navigation/Sidebar";
import Navbar from "@/components/navigation/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { useAccount, useIsAuthenticated, useMsal } from "@azure/msal-react";

export default function Root() {
  // eslint-disable-next-line
  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();
  // eslint-disable-next-line
  const account = useAccount(accounts[0] || {});

  return (
    <div className="bg-background pb-10">
      <Navbar />
      <div className="">
        <Sidebar />
        <div className="ml-20 lg:ml-0 pt-8 lg:pl-[17rem] xl:pl-[23rem]">
          <div className="mr-20 xl:mr-48 lg:pl-8">
            <Outlet />
          </div>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
