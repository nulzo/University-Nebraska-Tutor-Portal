import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import InputForm from "./components/views/Login.tsx";
import Dashboard from "./components/views/Dashboard.tsx";
// import Tutors from "./components/views/Tutors.tsx";
// import CreateTicket from "./components/views/CreateTicket.tsx";
import Hours from "./components/views/Hours.tsx";
import ViewTickets from "./components/views/ViewTickets.tsx";
import Home from "./components/views/Home.tsx";
import Search from "./components/views/Search.tsx";
import TestViewTickets from "./components/views/TestViewTicket.tsx";
import GenerateData from "./components/views/GenerateFakeData.tsx";
import Root from "./Root.tsx";
import ErrorView from "./views/ErrorView.tsx";
import Zoom from "./views/ZoomView.tsx";
import DownloadView from "./views/admin/AdminDownloadView.tsx";
import "./style/globals.css"
import CreateTicketView from "./views/CreateTicketView.tsx";
import { SettingsView } from "./views/SettingsView.tsx";
import TicketView from "./views/TicketView.tsx";
import ScheduleView from "./views/ScheduleView.tsx";
import ProfileView from "./views/ProfileView.tsx";
import MessageView from "./views/MessageView.tsx";
import AdminAnnouncements from "./views/admin/AdminAnnouncements.tsx";
import AdminSettings from "./views/admin/AdminSettings.tsx";
import TutorDashboard from "./views/tutor/TutorDashboardView.tsx";
import DevAPIView from "./views/development/DevAPIView.tsx";
import DevGenerateData from "./views/development/DevGenerateData.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorView />,
    children: [
      {
        path: "home/",
        element: <Home />,
      },
      {
        path: "search/",
        element: <Search />
      },
      {
        path: "admin-dashboard/",
        element: <Dashboard />
      },
      {
        path: "tutors/",
        element: <ViewTickets />
      },
      {
        path: "zoom/",
        element: <Zoom />
      },
      {
        path: "hours/",
        element: <Hours />
      },
      {
        path: "create/",
        element: <CreateTicketView />
      },
      {
        path: "view/",
        element: <TestViewTickets data={""} />
      },
      {
        path: "edit/",
        element: <GenerateData />
      },
      {
        path: "blame/",
        element: <ErrorView />
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
        path: "tickets/",
        element: <TicketView />
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
        element: <DevAPIView />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
