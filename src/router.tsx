import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import * as Pages from "pages";
import { PATH } from "constants/path";
import { useRecoilState } from "recoil";
import { adminLoginInfoAtom } from "store/admin";
import { Suspense } from "react";

export default function Router() {
  const [{ data }] = useRecoilState(adminLoginInfoAtom);

  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <App />,
      errorElement: <Pages.NotFoundPage />,
      children: [
        {
          index: true,
          path: PATH.HOME,
          element: <Pages.HomePage />
        }
      ]
    },
    {
      path: PATH.LOGIN,
      element: <Pages.SignInPage />
    },
    {
      path: PATH.SIGNUP,
      element: <Pages.SignUpPage />
    },
    {
      path: "*",
      element: <Pages.NotFoundPage />
    },
    {
      path: PATH.ADMIN,
      children: [
        {
          path: PATH.ADMIN_ATTENDANCE,
          element: <Pages.AttendancePage />
        },
        {
          path: PATH.ADMIN_ATTEND_CARE,
          element: <Pages.AttendCarePage />
        },
        {
          path: PATH.ADMIN_DOG_INFO,
          element: <Pages.DogInfoPage />
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
              element: <Pages.SchoolManagePage />
            },
            {
              path: PATH.ADMIN_ENROLLMENT,
              element: <Pages.SchoolManageEnrollmentPage />
            },
            {
              path: PATH.ADMIN_FORMS,
              element: <Pages.EnrollmentFormListPage />
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
              path: PATH.ADMIN_FORM(":formId"),
              element: (
                <Suspense>
                  <Pages.EnrollmentFormDetailPage />
                </Suspense>
              )
            },
            {
              path: PATH.ADMIN_EDIT_FORM(":formId"),
              element: (
                <Suspense>
                  <Pages.EnrollmentFormEditPage />
                </Suspense>
              )
            },
            {
              path: PATH.ADMIN_TEACHER_MANAGE,
              element: <Pages.TeacherManagePage />
            }
          ]
        },
        {
          path: PATH.ADMIN_MY_PAGE,
          element: <Pages.MyPage />
        }
      ]
    },
    {
      children: [
        {
          path: PATH.OWNER_MA,
          element: (
            <Suspense>
              <Pages.MembershipApplicationPage />
            </Suspense>
          )
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}
