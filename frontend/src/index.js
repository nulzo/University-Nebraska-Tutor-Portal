import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "../src/styles/output.css"
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./views/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
      {
    path: "/app",
    element: <App/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
