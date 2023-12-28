import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import * as Pages from "pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Pages.NotFoundPage />,
    children: [
      {
        index: true,
        path: "/home",
        element: <Pages.HomePage />,
      },
    ],
  },
  {
    path: "/signIn",
    element: <Pages.SignInPage />,
  },
  {
    path: "/signUp",
    element: <Pages.SignUpPage />,
  },
  {
    path: "*",
    element: <Pages.NotFoundPage />,
  },
  {
    path: "/admin",
    children: [
      {
        path: "attendance",
        element: <Pages.AttendancePage />,
      },
      {
        path: "attendCare",
        element: <Pages.AttendCarePage />,
      },
      {
        path: "dogInfo",
        element: <Pages.DogInfoPage />,
      },
      {
        path: "schoolManage",
        element: <Pages.SchoolManagePage />,
      },
    ],
  },
]);

export default router;
