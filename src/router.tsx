import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import * as Pages from "pages";
import { PATH } from "constants/path";

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
            children: [
              {
                path: PATH.ADMIN_FORMS,
                element: <Pages.EnrollmentFormListPage />
              },
              {
                path: PATH.ADMIN_CREATE_FORM,
                element: <Pages.EnrollmentFormCreatePage />
              },
              {
                path: PATH.ADMIN_FORM(":formId"),
                element: <Pages.EnrollmentFormPage />
              },
              {
                path: PATH.ADMIN_EDIT_FORM(":formId"),
                element: <Pages.EnrollmentFormEditPage />
              }
            ]
          }
        ]
      }
    ]
  },
  {
    children: [
      {
        path: PATH.OWNER_MA,
        element: <Pages.MembershipApplicationPage />
      }
    ]
  }
]);

export default router;
