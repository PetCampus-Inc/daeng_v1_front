import { PATH } from "constants/path";

import { QueryClient } from "@tanstack/react-query";
import * as Pages from "pages";
import { Suspense } from "react";
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import caredogLoader from "routes/caredogLoader";
import { adminLoginInfoAtom } from "store/admin";
import { isTRole } from "utils/typeGuard";

import App from "./App";

const AppRouter = ({ queryClient }: { queryClient: QueryClient }) => {
  const [adminInfo] = useRecoilState(adminLoginInfoAtom);
  const router = createBrowserRouter([
    {
      path: PATH.ADMIN,
      element: <App />,
      errorElement: <Pages.NotFoundPage />,
      children: [
        {
          path: PATH.ADMIN_ATTENDANCE,
          children: [
            {
              index: true,
              element: (
                <Suspense>
                  <Pages.AttendancePage />
                </Suspense>
              )
            },
            {
              path: PATH.ADMIN_ATTENDANCE_INFO(),
              element: (
                <Suspense>
                  <Pages.DogInfoPage />
                </Suspense>
              )
            }
          ]
        },
        {
          path: PATH.ADMIN_CARE_DOG,
          id: "caredog",
          loader: () => caredogLoader({ adminId: adminInfo.adminId, queryClient }),
          children: [
            {
              index: true,
              element: (
                <Suspense>
                  <Pages.AttendCarePage />
                </Suspense>
              )
            },
            {
              path: "delete",
              element: <Pages.AttendCareDeletePage />
            }
          ]
        },
        {
          path: PATH.ADMIN_CHAT,
          element: <Pages.Chat />
        },
        {
          path: PATH.ADMIN_SCHOOL_MANAGE,
          children: [
            {
              index: true,
              element: (
                <Suspense>
                  <Pages.SchoolManagePage />
                </Suspense>
              )
            },
            {
              path: PATH.ADMIN_ENROLLMENT,
              element: (
                <Suspense>
                  <Pages.SchoolManageEnrollmentPage />
                </Suspense>
              )
            },
            {
              path: PATH.ADMIN_FORMS,
              element: (
                <Suspense>
                  <Pages.EnrollmentFormListPage />
                </Suspense>
              )
            },
            {
              path: PATH.ADMIN_CREATE_FORM,
              element: (
                <Suspense>
                  <Pages.EnrollmentFormCreatePage />
                </Suspense>
              )
            },
            {
              path: PATH.ADMIN_SUBMIT_FORM,
              element: (
                <Suspense>
                  <Pages.EnrollmentFormSubmitPage />
                </Suspense>
              )
            },
            {
              path: PATH.ADMIN_EDIT_FORM(),
              element: (
                <Suspense>
                  <Pages.EnrollmentFormEditPage />
                </Suspense>
              )
            },
            {
              path: PATH.ADMIN_FORM(),
              element: (
                <Suspense>
                  <Pages.EnrollmentFormDetailPage />
                </Suspense>
              )
            },
            {
              path: PATH.ADMIN_TEACHER_MANAGE,
              element: (
                <Suspense>
                  <Pages.TeacherManagePage />
                </Suspense>
              )
            }
          ]
        },
        {
          path: PATH.ADMIN_MY_PAGE,
          element: <Pages.MyPage />
        }
      ],
      loader: () => {
        if (!isTRole(adminInfo.role)) return redirect("/");
        return null;
      }
    },
    {
      path: PATH.ROOT,
      element: <App />,
      errorElement: <Pages.NotFoundPage />,
      children: [
        {
          index: true,
          // path: PATH.HOME,
          loader: () => redirect(PATH.ADMIN_ATTENDANCE),
          element: (
            <Suspense>
              <Pages.HomePage />
            </Suspense>
          )
        },
        {
          path: PATH.LOGIN,
          element: (
            <Suspense>
              <Pages.SignInPage />
            </Suspense>
          )
        },
        {
          path: PATH.SIGNUP,
          element: <Pages.SignUpPage />
        },
        {
          path: PATH.ENROLLMENT,
          element: (
            <Suspense>
              <Pages.MembershipApplicationPage />
            </Suspense>
          )
        }
      ],
      loader: () => {
        // if (auth.role !== "USER") return redirect(PATH.LOGIN);
        return null;
      }
    }
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
