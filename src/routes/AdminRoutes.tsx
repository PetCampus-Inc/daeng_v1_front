import type { QueryClient } from "@tanstack/react-query";

import { PATH } from "constants/path";

import { useLocalStorageValue } from "hooks/common/useLocalStorage";
import * as Pages from "pages";
import { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import caredogLoader from "routes/caredogLoader";
import { AUTH_KEY } from "store/auth";

import AdminAuthRouter from "./AdminAuthRouter";
import AuthProvider from "./AuthProvider";

import type { AdminAuthType } from "types/admin/admin.type";

const AdminRoutes = ({ queryClient }: { queryClient: QueryClient }): RouteObject[] => {
  const auth = useLocalStorageValue<AdminAuthType | null>(AUTH_KEY, null);

  return [
    {
      path: PATH.ADMIN,
      element: (
        <AuthProvider>
          <AdminAuthRouter />
        </AuthProvider>
      ),
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
          children: [
            {
              index: true,
              id: "caredog",
              loader: () => caredogLoader({ adminId: auth?.adminId, queryClient }),
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
              path: "gallery",
              element: <Pages.AttendCareGallery type="main" />
            },
            {
              path: PATH.ADMIN_CARE_NOTICE(),
              element: (
                <Suspense>
                  <Pages.AttendCareNoticePage />
                </Suspense>
              )
            },
            {
              path: PATH.ADMIN_CARE_INFO_GALLERY(),
              element: <Pages.AttendCareGallery type="info" />
            }
          ]
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
          // MEMO: 원장 권한의 페이지
          path: PATH.ADMIN_SCHOOL_MANAGE,
          element: <AdminAuthRouter isOwnerOnly />,
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
              path: PATH.ADMIN_TEACHER_MANAGE,
              element: (
                <Suspense>
                  <Pages.TeacherManagePage />
                </Suspense>
              )
            },
            {
              path: PATH.ADMIN_ENROLLMENT,
              children: [
                {
                  index: true,
                  element: (
                    <Suspense>
                      <Pages.SchoolManageEnrollmentPage />
                    </Suspense>
                  )
                },
                {
                  path: PATH.ADMIN_MEMBER_FORM(),
                  element: (
                    <Suspense>
                      <Pages.MemberEnrollmentFormDetailPage />
                    </Suspense>
                  )
                },
                {
                  path: PATH.ADMIN_FORMS,
                  children: [
                    {
                      index: true,
                      element: (
                        <Suspense>
                          <Pages.EnrollmentFormListPage />
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
                    }
                  ]
                },
                {
                  path: PATH.ADMIN_CREATE_FORM,
                  element: (
                    <Suspense>
                      <Pages.EnrollmentFormCreatePage />
                    </Suspense>
                  )
                }
              ]
            }
          ]
        },
        {
          path: PATH.ADMIN_MY_PAGE,
          children: [
            {
              index: true,
              element:
                auth?.role === "ROLE_OWNER" ? (
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
              path: PATH.ADMIN_MY_SCHOOL_INFO,
              element: (
                <Suspense>
                  <Pages.SchoolInfoPage />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ];
};

export default AdminRoutes;
