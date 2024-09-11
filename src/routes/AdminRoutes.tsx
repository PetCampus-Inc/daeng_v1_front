import type { QueryClient } from "@tanstack/react-query";

import { routes } from "constants/path";

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
      path: routes.admin.root,
      element: (
        <PrivateRouter
          roles={[Role.ROLE_OWNER, Role.ROLE_TEACHER]}
          redirectPath={routes.admin.login.root}
        />
      ),
      children: [
        {
          index: true,
          loader: () => redirect(routes.admin.attendance.root)
        },
        {
          path: routes.admin.attendance.root,
          children: [
            {
              index: true,
              element: <Pages.AttendancePage />
            },
            {
              path: routes.admin.attendance.info.dynamic(),
              element: (
                <Suspense>
                  <Pages.DogDetailInfoPage />
                </Suspense>
              )
            },
            {
              path: routes.admin.attendance.newTicket.dynamic(),
              element: (
                <Suspense>
                  <Pages.NewTicketPage />
                </Suspense>
              )
            },
            {
              path: routes.admin.attendance.gallery.dynamic(),
              element: (
                <Suspense>
                  <Pages.DogGalleryPage />
                </Suspense>
              )
            }
          ]
        },
        {
          path: routes.admin.care.root,
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
              path: routes.admin.care.delete.root,
              element: <Pages.AttendCareDeletePage />
            },
            {
              path: routes.admin.care.gallery.root,
              children: [
                {
                  index: true,
                  element: <Pages.AttendCareGallery type="main" />
                },
                {
                  path: routes.admin.care.gallery.select.root,
                  element: <Pages.AttendCareSelectDog />
                }
              ]
            },
            {
              path: routes.admin.care.notice.dynamic(),
              element: (
                <Suspense>
                  <Pages.AttendCareNoticePage />
                </Suspense>
              )
            },
            {
              path: routes.admin.care.gallery.dynamic(),
              element: <Pages.AttendCareGallery type="info" />
            }
          ]
        },
        {
          path: routes.admin.chat.root,
          element: (
            <Suspense>
              <Pages.Chat />
            </Suspense>
          )
        },
        {
          path: routes.admin.notification.root,
          element: (
            <Suspense>
              <Pages.AdminNotificationPage />
            </Suspense>
          )
        },
        {
          // NOTE: 원장 권한의 페이지
          path: routes.admin.school.root,
          element: (
            <PrivateRouter roles={[Role.ROLE_OWNER]} redirectPath={routes.admin.attendance.root} />
          ),
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
              path: routes.admin.school.teacher.root,
              element: (
                <Suspense>
                  <Pages.TeacherManagePage />
                </Suspense>
              )
            },
            {
              path: routes.admin.school.enrollment.root,
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
                  path: routes.admin.school.enrollment.memberForms.dynamic(),
                  element: (
                    <Suspense>
                      <Pages.MemberEnrollmentFormDetailPage />
                    </Suspense>
                  )
                },
                {
                  path: routes.admin.school.enrollment.ownerForms.root,
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
                      path: routes.admin.school.enrollment.ownerForms.edit.dynamic(),
                      element: (
                        <Suspense>
                          <Pages.EnrollmentFormEditPage />
                        </Suspense>
                      )
                    },
                    {
                      path: routes.admin.school.enrollment.ownerForms.dynamic(),
                      element: (
                        <Suspense>
                          <Pages.EnrollmentFormDetailPage />
                        </Suspense>
                      )
                    }
                  ]
                },
                {
                  path: routes.admin.school.enrollment.new.root,
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
          path: routes.admin.mypage.root,
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
              path: routes.admin.mypage.school.root,
              element: (
                <Suspense>
                  <Pages.SchoolInfoPage />
                </Suspense>
              )
            },
            {
              path: routes.admin.mypage.school.edit.root,
              element: (
                <Suspense>
                  <Pages.SchoolInfoEditPage />
                </Suspense>
              )
            },
            {
              path: routes.admin.mypage.setting.root,
              element: (
                <Suspense>
                  <Pages.AdminSettingPage />
                </Suspense>
              )
            },
            {
              path: routes.admin.mypage.deleteComplete.root,
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
