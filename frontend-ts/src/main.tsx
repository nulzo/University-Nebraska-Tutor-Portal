import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./components/views/Search.tsx";
import Root from "./Root.tsx";
import ErrorView from "./views/ErrorView.tsx";
import Zoom from "./views/ZoomView.tsx";
import DownloadView from "./views/admin/AdminDownloadView.tsx";
import "./style/globals.css"
import CreateTicketView from "./views/CreateTicketView.tsx";
import { SettingsView } from "./views/SettingsView.tsx";
import ScheduleView from "./views/ScheduleView.tsx";
import ProfileView from "./views/ProfileView.tsx";
import MessageView from "./views/MessageView.tsx";
import AdminAnnouncements from "./views/admin/AdminAnnouncements.tsx";
import AdminSettings from "./views/admin/AdminSettings.tsx";
import TutorDashboard from "./views/tutor/TutorDashboardView.tsx";
import DevAPIView from "./views/development/DevAPIView.tsx";
import DevGenerateData from "./views/development/DevGenerateData.tsx";
import DevSandbox from "./views/development/DevSandbox.tsx";
import AdminDashboard from "./views/admin/AdminDashboard.tsx";
import HomeView from "./views/HomeView.tsx";
import HoursView from "./views/HoursView.tsx";
import AdminBlame from "./views/admin/AdminBlame.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorView />,
    children: [
      {
        path: "home/",
        element: <HomeView />,
      },
      {
        path: "search/",
        element: <Search />
      },
      {
        path: "admin-dashboard/",
        element: <AdminDashboard />
      },
      {
        path: "zoom/",
        element: <Zoom />
      },
      {
        path: "hours/",
        element: <HoursView />
      },
      {
        path: "create/",
        element: <CreateTicketView />
      },
      {
        path: "blame/",
        element: <AdminBlame />
      },
      {
        path: "announcements/",
        element: <AdminAnnouncements />
      },
      {
        path: "admin-settings/",
        element: <AdminSettings />
      },
      {
        path: "download/",
        element: <DownloadView />
      },
      {
        path: "settings/",
        element: <SettingsView />
      },
      {
        path: "schedule/",
        element: <ScheduleView />
      },
      {
        path: "profile/",
        element: <ProfileView />
      },
      {
        path: "messages/",
        element: <MessageView />
      },
      {
        path: "dashboard/",
        element: <TutorDashboard />
      },
      {
        path: "generate/",
        element: <DevGenerateData />
      },
      {
        path: "test-api/",
        element: <DevAPIView />
      },
      {
        path: "sandbox/",
        element: <DevSandbox />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
