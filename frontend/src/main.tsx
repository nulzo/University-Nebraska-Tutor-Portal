import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.tsx";
import ErrorView from "./views/ErrorView.tsx";
import Zoom from "./views/ZoomView.tsx";
import DownloadView from "./views/admin/AdminDownloadView.tsx";
import "./style/globals.css";
import CreateTicketView from "./views/CreateTicketView.tsx";
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
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/forms/ThemeProvider.tsx";

const queryClient = new QueryClient();

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
        path: "create/",
        // element: <LoginRequired view={<CreateTicketView />} />,
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
        element: <LoginRequired view={<ProfileView />} />,
      },
      {
        path: "messages/",
        element: <LoginRequired view={<MessageView />} />,
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
      {
        path: "login/",
        element: <LoginView />,
      },
    ],
  },
]);

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </MsalProvider>
  </React.StrictMode>,
);
