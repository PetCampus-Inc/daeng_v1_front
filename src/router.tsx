import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFoundPage from "pages/NotFoundPage";
import { HomePage } from "pages";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";

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
    path: "/signUp",
    element: <SignUpPage />,
  },
  //admin 관련 페이지
  {
    path: "/admin/main",
    element: <SignUpPage />,
  },
  //user 관련 페이지
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
