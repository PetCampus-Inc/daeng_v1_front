import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFoundPage from "pages/NotFoundPage";
import { HomePage } from "pages";
import SignInPage from "pages/SignInPage";

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
    path: "/signIn",
    element: <SignInPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
