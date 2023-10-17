import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import InputForm from "./components/views/Login.tsx";
import Dashboard from "./components/views/Dashboard.tsx";
// import Tutors from "./components/views/Tutors.tsx";

// import CreateTicket from "./components/views/CreateTicket.tsx";
// import Hours from "./components/views/Hours.tsx";
// import ViewTickets from "./components/views/ViewTickets.tsx";
import Home from "./components/views/Home.tsx";
import Search from "./components/views/Search.tsx";
import TestAPI from "./components/views/TestAPI.tsx";
import TestViewTickets from "./components/views/TestViewTicket.tsx";
// import GenerateData from "./components/views/GenerateFakeData.tsx";
import Root, { loader as rootLoader } from "./Root.tsx";
import ErrorView from "./views/ErrorView.tsx";
import Zoom from "./views/ZoomView.tsx";
import WebsocketView from "./views/WebsocketView.tsx";
import DownloadView from "./views/DownloadView.tsx";
import "./style/globals.css"

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
        path: "dashboard/",
        element: <Dashboard />
      },
      {
        path: "tutors/",
        element: <WebsocketView />
      },
      {
        path: "zoom/",
        element: <Zoom />
      },
      {
        path: "tickets/create",
        element: <TestAPI />
      },
      {
        path: "tickets/view",
        element: <TestViewTickets data={""} />
      },
      {
        path: "user/settings",
        element: <DownloadView />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<App children={<Home />} />} />
        <Route path="search/" element={<App children={<Search />} />} />
        <Route path="dashboard/" element={<App children={<Dashboard />} />} />
        <Route path="tutors/" element={<App children={<Tutors />} />} />
        <Route path="about/" element={<App children={<InputForm />} />} />
        <Route path="zoom/" element={<App children={<Zoom />} />} />
        <Route path="hours/" element={<App children={<Hours />} />} />
        <Route
          path="tickets/create/"
          element={<App children={<TestAPI />} />}
        />
        <Route
          path="tickets/view/"
          element={<App children={<TestViewTickets />} />}
        />
        <Route
          path="tickets/edit/"
          element={<App children={<InputForm />} />}
        />
        <Route
          path="user/profile/"
          element={<App children={<InputForm />} />}
        />
        <Route
          path="user/messages/"
          element={<App children={<InputForm />} />}
        />
        <Route
          path="user/settings/"
          element={<App children={<GenerateData />} />}
        />
      </Routes>
    </BrowserRouter> */}
  </React.StrictMode>,
);
