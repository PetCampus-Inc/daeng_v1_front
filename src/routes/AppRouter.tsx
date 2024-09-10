import type { QueryClient } from "@tanstack/react-query";

import { routes } from "constants/path";

import ApiErrorBoundary from "ApiErrorBoundary";
import App from "App";
import { FullHeight } from "components/common";
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
        <FullHeight>
          <ApiErrorBoundary>
            <App />
          </ApiErrorBoundary>
        </FullHeight>
      ),
      errorElement: (
        <FullHeight>
          <LoaderErrorPage />
        </FullHeight>
      ),
      children: [
        {
          id: "root",
          path: routes.root,
          children: [
            {
              path: routes.login.root,
              index: true,
              element: (
                <Suspense>
                  <Pages.LoginPage />
                </Suspense>
              )
            },
            {
              path: routes.signup.root,
              element: <Pages.SignUpPage />
            },
            {
              path: routes.approval.root,
              element: <Pages.ApprovalStatusPage />
            },
            {
              path: routes.admin.login.root,
              element: <Pages.AdminLoginPage />
            },
            {
              path: routes.admin.signup.root,
              element: <Pages.AdminSignupPage />
            },
            // {
            //   path: routes.redirect.root,
            //   element: <Pages.RedirectPage />
            // },
            {
              path: routes.unregister.root,
              element: (
                <Suspense>
                  <Pages.UnregisterPage />
                </Suspense>
              )
            },
            {
              path: routes.unregister.success.root,
              element: (
                <Suspense>
                  <Pages.UnregisterSuccessPage />
                </Suspense>
              )
            },
            {
              path: routes.policy.root,
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
