import "./style/output.css";
import Navbar from "./components/navigation/Navbar";
import { Sidebar } from "./components/navigation/Sidebar";
import { SidebarAdmin } from "./components/navigation/SidebarAdmin";
import { ReactNode, useEffect, useState } from "react";
import {
  Callout,
  CalloutIcon,
  CalloutText,
  Link,
  Theme,
} from "@radix-ui/themes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { SidebarStudent } from "./components/navigation/SidebarStudent";
import { ToastContainer } from "react-toastify";
import { Toaster } from "./components/ui/toaster";

function App({ children }: { children: ReactNode }) {
  const [user, setUser] = useState("Student");

  useEffect(() => {
    window.localStorage.setItem("user", user);
  }, [user]);

  useEffect(() => {
    const u = window.localStorage.getItem("user") || "{}";
    console.log(u);
    setUser(u);
  }, []);

  console.log(user);
  return (
    <>
      <Theme
        accentColor="ruby"
        grayColor="mauve"
        panelBackground="translucent"
        scaling="100%"
        radius="small"
      >
        <Callout.Root
          color="yellow"
          className="text-center flex justify-center"
        >
          <CalloutIcon>
            <ExclamationTriangleIcon></ExclamationTriangleIcon>
          </CalloutIcon>
          <CalloutText className="flex">
            <strong>Alert:</strong> You are viewing a DEMO version of the
            application!
            <div className="flex px-4 space-x-0.5">
              <p>View As:</p>

              {user === "Student" ? (
                <Link className="font-bold" onClick={() => setUser("Student")}>
                  Student
                </Link>
              ) : (
                <Link className="" onClick={() => setUser("Student")}>
                  Student
                </Link>
              )}
              <p>,</p>
              {user === "Tutor" ? (
                <Link className="font-bold" onClick={() => setUser("Tutor")}>
                  Tutor
                </Link>
              ) : (
                <Link className="" onClick={() => setUser("Tutor")}>
                  Tutor
                </Link>
              )}
              <p>, or</p>
              {user === "Admin" ? (
                <Link className="font-bold" onClick={() => setUser("Admin")}>
                  Admin
                </Link>
              ) : (
                <Link className="" onClick={() => setUser("Admin")}>
                  Admin
                </Link>
              )}
            </div>
          </CalloutText>
        </Callout.Root>
        <div className="bg-white">
          <Navbar></Navbar>
          <div className="border-t">
            <div className="bg-background">
              <div className="grid lg:grid-cols-5">
                {user === "Student" && (
                  <SidebarStudent className="hidden lg:block"></SidebarStudent>
                )}
                {user === "Tutor" && (
                  <Sidebar className="hidden lg:block"></Sidebar>
                )}
                {user === "Admin" && (
                  <SidebarAdmin className="hidden lg:block"></SidebarAdmin>
                )}
                <div className="col-span-3 lg:col-span-4 lg:border-l">
                  <div className="h-full mx-10 px-4 py-6 lg:px-1">
                    {children}
                  </div>
                  <Toaster />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Theme>
    </>
  );
}

export default App;
