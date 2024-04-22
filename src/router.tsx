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
  const [auth] = useRecoilState(adminLoginInfoAtom);
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
            },
            {
              path: PATH.ADMIN_ATTENDANCE_INFO_NEW_TICKET(),
              element: (
                <Suspense>
                  <Pages.NewTicketPage />
                </Suspense>
              )
            },
            {
              path: PATH.ADMIN_ATTENDANCE_INFO_GALLERY(),
              element: (
                <Suspense>
                  <Pages.DogGalleryPage />
                </Suspense>
              )
            }
          ]
        },
        {
          path: PATH.ADMIN_CARE,
          id: "caredog",
          loader: () => caredogLoader({ adminId: auth.adminId, queryClient }),
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
            },
            {
              // 강아지 관리 메인 사진 앨범 전송
              path: PATH.ADMIN_CARE_GALLERY,
              element: <Pages.AttendCareGallery type="main" />
            },
            {
              path: PATH.ADMIN_CARE_INFO(),
              children: [
                {
                  // 강아지 관리 상세
                  index: true,
                  element: <Pages.AttendCareInfo />
                },
                {
                  // 강아지 관리 상세 사진 앨범 전송
                  path: PATH.ADMIN_CARE_INFO_GALLERY(),
                  element: <Pages.AttendCareGallery type="info" />
                }
              ]
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
          children: [
            {
              index: true,
              element:
                auth.role === "ROLE_OWNER" ? (
                  <Suspense>
                    <Pages.PrincipalMyPage />
                  </Suspense>
                ) : (
                  <Suspense>
                    <Pages.TeacherMyPage />
                  </Suspense>
                )
            },
            {
              // 마페 - 프로필 수정
              path: PATH.ADMIN_MY_PAGE_EDIT
              // element: <Pages.EditAdminProfile />
            },
            {
              // 교사 마페 - 유치원 상세 정보
              path: PATH.ADMIN_MY_SCHOOL_INFO,
              element: (
                <Suspense>
                  <Pages.SchoolInfoPage />
                </Suspense>
              )
            },
            {
              // 원장 마페 - 유치원 정보 수정
              path: PATH.ADMIN_MY_SCHOOL_INFO_EDIT
              // element: <Pages.SchoolInfoEditPage />
            }
          ]
        }
      ],
      loader: () => {
        if (!isTRole(auth.role)) return redirect("/");
        return null;
      }
    },
    {
      path: PATH.MEMBER,
      element: <App />,
      errorElement: <Pages.NotFoundPage />,
      children: [
        {
          path: PATH.MEMBER_UNREGISTER,
          element: (
            <Suspense>
              <Pages.UnregisterPage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_MY_PAGE,
          element: (
            <Suspense>
              <Pages.MemberMyPage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_UNREGISTER_SUCCESS,
          element: (
            <Suspense>
              <Pages.UnregisterSuccessPage />
            </Suspense>
          )
        }
      ]
    },
    {
      path: PATH.SETTING,
      element: <App />,
      errorElement: <Pages.NotFoundPage />,
      children: [
        {
          path: PATH.SETTING,
          element: (
            <Suspense>
              <Pages.SettingPage />
            </Suspense>
          )
        },
        {
          path: PATH.SETTING_NOTIFICATION,
          element: (
            <Suspense>
              <Pages.SettingNotificationPage />
            </Suspense>
          )
        }
      ]
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
          path: PATH.ENROLL,
          element: (
            <Suspense>
              <Pages.MembershipApplicationPage />
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
        },
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
