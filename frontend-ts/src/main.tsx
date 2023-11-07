import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Search from "./components/views/Search.tsx";
import Root from "./Root.tsx";
import ErrorView from "./views/ErrorView.tsx";
import Zoom from "./views/ZoomView.tsx";
import DownloadView from "./views/admin/AdminDownloadView.tsx";
import "./style/globals.css";
import CreateTicketView from "./views/CreateTicketView.tsx";
import { SettingsView } from "./views/SettingsView.tsx";
import ScheduleView from "./views/ScheduleView.tsx";
import ProfileView from "./views/ProfileView.tsx";
import MessageView from "./views/MessageView.tsx";
import AdminAnnouncements from "./views/admin/AdminAnnouncements.tsx";
import AdminSettings from "./views/admin/AdminSettings.tsx";
import TutorDashboard from "./views/tutor/TutorDashboardView.tsx";
import DevAPIView from "./views/development/DevAPIView.tsx";
import DevSandbox from "./views/development/DevSandbox.tsx";
import AdminDashboard from "./views/admin/AdminDashboard.tsx";
import HomeView from "./views/HomeView.tsx";
import HoursView from "./views/HoursView.tsx";
import AdminBlame from "./views/admin/AdminBlame.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TutorView from "./views/tutor/TutorView.tsx";
import AdminRequired from "./routes/AdminRequired.tsx";
import TutorRequired from "./routes/TutorRequired.tsx";
import LoginRequired from "./routes/LoginRequired.tsx";
import LoginView from "./views/LoginView.tsx";
import LogoutRequired from "./routes/LogoutRequired.tsx";
import ForEthan from "./views/ethan.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginRequired view={<Root />} />,
    errorElement: <ErrorView />,
    children: [
      {
        path: "home/",
        element: <HomeView />,
      },
      // {
      //   path: "search/",
      //   element: <Search />,
      // },
      {
        path: "create/",
        element: <CreateTicketView />,
      },
      {
        path: "zoom/",
        element: <Zoom />,
      },
      {
        path: "hours/",
        element: <HoursView />,
      },
      {
        path: "profile/",
        element: <ProfileView />,
      },
      {
        path: "messages/",
        element: <MessageView />,
      },
      {
        path: "settings/",
        element: <SettingsView />,
      },
      {
        path: "admin/dashboard/",
        element: <AdminRequired view={<AdminDashboard />} />,
      },
      {
        path: "admin/blame/",
        element: <AdminRequired view={<AdminBlame />} />,
      },
      {
        path: "admin/announcements/",
        element: <AdminRequired view={<AdminAnnouncements />} />,
      },
      {
        path: "admin/settings/",
        element: <AdminRequired view={<AdminSettings />} />,
      },
      {
        path: "admin/download/",
        element: <AdminRequired view={<DownloadView />} />,
      },
      {
        path: "tutor/schedule/",
        element: <TutorRequired view={<ScheduleView />} />,
      },
      {
        path: "tutor/tutors/",
        element: <TutorRequired view={<TutorView />} />,
      },
      {
        path: "tutor/dashboard/",
        element: <TutorRequired view={<TutorDashboard />} />,
      },
      {
        path: "test-api/",
        element: <DevAPIView />,
      },
      {
        path: "sandbox/",
        element: <DevSandbox />,
      },
    ],
  },
  {
    path: "login/",
    element: <LogoutRequired view={<LoginView />} />,
  },
  {
    path: "ethan/",
    element: <ForEthan />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
