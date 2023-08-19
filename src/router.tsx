import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFoundPage from "pages/NotFoundPage";
import { HomePage } from "pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        path: "/home",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
