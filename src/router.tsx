import { PATH } from "constants/path";

import * as Pages from "pages";
import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import { adminLoginInfoAtom } from "store/admin";

import App from "./App";

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
      element: <Pages.SignUpPage />
    },
    {
      path: "*",
      element: <Pages.NotFoundPage />
    },
    {
      path: PATH.ADMIN_ATTENDANCE,
      element: (
        <Suspense>
          <Pages.AttendancePage />
        </Suspense>
      )
    },
    {
      path: PATH.ADMIN_CARE_DOG,
      element: (
        <Suspense>
          <Pages.AttendCarePage />
        </Suspense>
      ),
      children: [
        {
          path: "delete",
          element: <Pages.AttendCareDeletePage />
        }
      ]
    },
    {
      path: PATH.ADMIN_DOG_INFO,
      element: (
        <Suspense fallback={<div>로딩중</div>}>
          <Pages.DogInfoPage />
        </Suspense>
      )
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
          path: PATH.ADMIN_EDIT_FORM(":formId"),
          element: (
            <Suspense>
              <Pages.EnrollmentFormEditPage />
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
