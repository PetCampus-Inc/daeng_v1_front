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
          element: (
            <Suspense>
              <Pages.HomePage />
            </Suspense>
          )
        }
      ]
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
      element: (
        <Suspense>
          <Pages.SignUpPage />
        </Suspense>
      )
    },
    {
      path: PATH.ADMIN,
      children: [
        {
          path: PATH.ADMIN_ATTENDANCE,
          element: (
            <Suspense>
              <Pages.AttendancePage />
            </Suspense>
          )
        },
        {
          path: PATH.ADMIN_ATTEND_CARE,
          element: (
            <Suspense>
              <Pages.AttendCarePage />
            </Suspense>
          )
        },
        {
          path: PATH.ADMIN_DOG_INFO,
          element: (
            <Suspense>
              <Pages.DogInfoPage />
            </Suspense>
          )
        },
        {
          path: PATH.ADMIN_CHAT,
          element: (
            <Suspense>
              <Pages.Chat />
            </Suspense>
          )
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
          element: (
            <Suspense>
              <Pages.MyPage />
            </Suspense>
          )
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
