import type { QueryClient } from "@tanstack/react-query";

import { PATH } from "constants/path";

import ApiErrorBoundary from "ApiErrorBoundary";
import App from "App";
import * as Pages from "pages";
import LoaderErrorPage from "pages/ErrorPage/LoaderErrorPage";
import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AdminRoutes from "./AdminRoutes";
import MemberRoutes from "./MemberRoutes";

const AppRouter = ({ queryClient }: { queryClient: QueryClient }) => {
  const router = createBrowserRouter([
    {
      element: (
        <ApiErrorBoundary>
          <App />
        </ApiErrorBoundary>
      ),
      errorElement: <LoaderErrorPage />,
      children: [
        {
          id: "root",
          path: PATH.ROOT,
          children: [
            {
              path: PATH.LOGIN,
              index: true,
              element: (
                <Suspense>
                  <Pages.LoginPage />
                </Suspense>
              )
            },
            {
              path: PATH.SIGNUP,
              element: <Pages.SignUpPage />
            },
            {
              path: PATH.ADMIN_LOGIN,
              element: <Pages.AdminLoginPage />
            },
            {
              path: PATH.ADMIN_SIGNUP,
              element: <Pages.AdminSignupPage />
            },
            {
              path: PATH.REDIRECT,
              element: <Pages.RedirectPage />
            },
            {
              path: PATH.UNREGISTER,
              element: (
                <Suspense>
                  <Pages.UnregisterPage />
                </Suspense>
              )
            },
            {
              path: PATH.UNREGISTER_SUCCESS,
              element: (
                <Suspense>
                  <Pages.UnregisterSuccessPage />
                </Suspense>
              )
            },
            {
              path: PATH.POLICY,
              element: (
                <Suspense>
                  <Pages.PolicyPage />
                </Suspense>
              )
            }
          ]
        },
        ...AdminRoutes({ queryClient }),
        ...MemberRoutes()
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
