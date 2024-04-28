import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.tsx";
import ErrorPage from "./views/ErrorPage.tsx";
import Zoom from "./views/ZoomView.tsx";
import DownloadView from "./views/admin/DownloadPage.tsx";
import "./style/globals.css";
import TicketPage from "./views/TicketPage.tsx";
import SchedulePage from "./views/SchedulePage.tsx";
import ProfilePage from "./views/ProfilePage.tsx";
import MessagePage from "./views/MessagePage.tsx";
import AnnouncementPage from "./views/admin/AnnouncementPage.tsx";
import AdminSettings from "./views/admin/AdminSettings.tsx";
import TutorDashboard from "./views/tutor/TutorDashboardView.tsx";
import DevAPIView from "./views/development/DevAPIView.tsx";
import DevSandbox from "./views/development/DevSandbox.tsx";
import AdminDashboard from "./views/admin/AdminDashboard.tsx";
import HomePage from "./views/HomePage.tsx";
import HoursPage from "./views/HoursPage.tsx";
import BlamePage from "./views/admin/BlamePage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TutorView from "./views/tutor/TutorView.tsx";
import AdminRequired from "./routes/AdminRequired.tsx";
import TutorRequired from "./routes/TutorRequired.tsx";
import LoginRequired from "./routes/LoginRequired.tsx";
import LoginPage from "./views/LoginPage.tsx";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig.ts";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/forms/ThemeProvider.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home/",
        element: <HomePage />,
      },
      {
        path: "create/",
        // element: <LoginRequired view={<TicketPage />} />,
        element: <TicketPage />,
      },
      {
        path: "zoom/",
        element: <Zoom />,
      },
      {
        path: "hours/",
        element: <HoursPage />,
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
        path: "tutor/schedule/",
        element: <TutorRequired view={<SchedulePage />} />,
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
