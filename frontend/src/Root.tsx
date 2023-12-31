import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/navigation/Sidebar";
import Navbar from "@/components/navigation/Navbar";
import { Toaster } from "@/components/ui/toaster";
import useFetchTicket from "./API/tickets/useFetchTicket";
import { useAccount, useIsAuthenticated, useMsal } from "@azure/msal-react";

export default function Root() {
  // eslint-disable-next-line
  const isAuthenticated = useIsAuthenticated();
  console.log(isAuthenticated)
  const { accounts } = useMsal();
  // eslint-disable-next-line
  const account = useAccount(accounts[0] || {});
  console.log(account)
  // eslint-disable-next-line
  const tickets = useFetchTicket("new", "?status=NEW");
  console.log(tickets)
  return (
    <div className="bg-background pb-10">
      <Navbar />
      {/* <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-14 3xl:grid-cols-14"> */}
      <div className="">
        <Sidebar />
        {/* <div className="col-span-3 sm:col-span-4 md:col-span-6 lg:col-span-6 xl:col-span-8 lg:border-l sm:border-muted-primary 3xl:col-span-9"> */}
        <div className="ml-20 lg:ml-0 lg:pl-[17rem]">
          <div className="mr-20 lg:pl-8">
            <Outlet />
          </div>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
