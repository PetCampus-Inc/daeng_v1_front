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
              path: routes.member.profile.root,
              element: (
                <Suspense>
                  <Pages.MemberProfileEditPage />
                </Suspense>
              )
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
            {
              path: routes.admin.signup.rejoin.root,
              element: <Pages.TeacherReJoinPage />
            },
            // {
            //   path: routes.redirect.root,
            //   element: <Pages.RedirectPage />
            // },
            {
              path: routes.unregister.success.root,
              element: (
                <Suspense>
                  <Pages.UnregisterSuccessPage />
                </Suspense>
              )
            },
            {
              path: routes.policy.service.root,
              element: (
                <Suspense>
                  <Pages.ServicePolicyPage />
                </Suspense>
              )
            },
            {
              path: routes.policy.privacy.root,
              element: (
                <Suspense>
                  <Pages.PrivacyPolicyPage />
                </Suspense>
              )
            },
            {
              path: routes.policy.usage.root,
              element: (
                <Suspense>
                  <Pages.UsagePolicyPage />
                </Suspense>
              )
            }
          ]
        },
        ...AdminRoutes({ queryClient }),
        ...MemberRoutes({ queryClient })
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
