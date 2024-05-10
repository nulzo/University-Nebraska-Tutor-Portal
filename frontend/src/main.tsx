import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.tsx";
import ErrorPage from "@/pages/error/error-page.tsx";
import InfoPage from "@/pages/general/info-page.tsx";
import DownloadView from "@/pages/admin/download-page.tsx";
import "./style/globals.css";
import TicketPage from "@/pages/general/ticket-page.tsx";
import SchedulePage from "@/pages/tutor/schedule-page.tsx";
import ProfilePage from "@/pages/general/profile-page.tsx";
import MessagePage from "@/pages/general/message-page.tsx";
import AnnouncementPage from "@/pages/admin/announcement-page.tsx";
import AdminSettings from "@/pages/admin/admin-settings.tsx";
import TutorDashboard from "@/pages/tutor/tutor-dashboard-page.tsx";
import AdminDashboard from "@/pages/admin/admin-dashboard.tsx";
import HomePage from "@/pages/general/home-page.tsx";
import BlamePage from "@/pages/admin/blame-page.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TutorPage from "@/pages/tutor/tutor-page.tsx";
import AdminRequired from "./routes/admin-required.tsx";
import TutorRequired from "./routes/tutor-required.tsx";
import LoginRequired from "./routes/login-required.tsx";
import LoginPage from "@/pages/general/login-page.tsx";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./auth-config.ts";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/forms/theme-provider.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "create/",
        // element: <LoginRequired view={<TicketPage />} />,
        element: <TicketPage />,
      },
      {
        path: "info/",
        element: <InfoPage />,
      },
      {
        path: "profile/",
        element: <LoginRequired view={<ProfilePage />} />,
      },
      {
        path: "messages/",
        element: <LoginRequired view={<MessagePage />} />,
      },
      {
        path: "admin/dashboard/",
        element: <AdminRequired view={<AdminDashboard />} />,
      },
      {
        path: "admin/blame/",
        element: <AdminRequired view={<BlamePage />} />,
      },
      {
        path: "admin/announcements/",
        element: <AdminRequired view={<AnnouncementPage />} />,
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
        path: "schedule/",
        element: <TutorRequired view={<SchedulePage />} />,
      },
      {
        path: "tutors/",
        element: <TutorRequired view={<TutorPage />} />,
      },
      {
        path: "dashboard/",
        element: <TutorRequired view={<TutorDashboard />} />,
      },
      {
        path: "login/",
        element: <LoginPage />,
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
