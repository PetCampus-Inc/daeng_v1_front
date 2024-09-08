import type { QueryClient } from "@tanstack/react-query";

import { PATH } from "constants/path";

import { useTokenHandler } from "hooks/common/useTokenHandler";
import * as Pages from "pages";
import { Suspense } from "react";
import { RouteObject, redirect } from "react-router-dom";
import caredogLoader from "routes/caredogLoader";
import PrivateRouter from "routes/PrivateRouter";
import { Role } from "types/common/role.types";

const AdminRoutes = ({ queryClient }: { queryClient: QueryClient }): RouteObject[] => {
  const { role } = useTokenHandler();

  return [
    {
      path: PATH.ADMIN,
      element: (
        <PrivateRouter
          roles={[Role.ROLE_OWNER, Role.ROLE_TEACHER]}
          redirectPath={PATH.ADMIN_LOGIN}
        />
      ),
      children: [
        {
          index: true,
          loader: () => redirect(PATH.ADMIN_ATTENDANCE)
        },
        {
          path: PATH.ADMIN_ATTENDANCE,
          children: [
            {
              index: true,
              element: <Pages.AttendancePage />
            },
            {
              path: PATH.ADMIN_ATTENDANCE_INFO(),
              element: (
                <Suspense>
                  <Pages.DogDetailInfoPage />
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
              loader: () => caredogLoader({ queryClient }),
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

              children: [
                {
                  index: true,
                  element: <Pages.AttendCareGallery type="main" />
                },
                {
                  path: PATH.ADMIN_CARE_GALLERY_SELECT,
                  element: <Pages.AttendCareSelectDog />
                }
              ]
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
          path: PATH.ADMIN_NOTIFICATION_PAGE,
          element: (
            <Suspense>
              <Pages.AdminNotificationPage />
            </Suspense>
          )
        },
        {
          // NOTE: 원장 권한의 페이지
          path: PATH.ADMIN_SCHOOL_MANAGE,
          element: <PrivateRouter roles={[Role.ROLE_OWNER]} redirectPath={PATH.ADMIN_ATTENDANCE} />,
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
                role === Role.ROLE_OWNER ? (
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
            },
            {
              path: PATH.ADMIN_MY_SCHOOL_INFO_EDIT,
              element: (
                <Suspense>
                  <Pages.SchoolInfoEditPage />
                </Suspense>
              )
            },
            {
              path: PATH.ADMIN_MY_PAGE_SETTING,
              element: (
                <Suspense>
                  <Pages.AdminSettingPage />
                </Suspense>
              )
            },
            {
              path: PATH.ADMIN_MY_PAGE_DELETE_COMPLETE,
              element: (
                <Suspense>
                  <Pages.AdminDeleteCompletePage />
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
